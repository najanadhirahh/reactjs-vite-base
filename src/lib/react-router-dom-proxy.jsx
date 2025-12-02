import * as React from "react";

// Runtime import of the real library under a different name (see vite.config alias)
// This is resolved at runtime by Vite alias
import * as RRD from "react-router-dom-original";

// Re-export everything to preserve API compatibility
export * from "react-router-dom-original";

/** --------------------- Outbound: route list (once) --------------------- */
let routesPosted = false;

// Promise resolved when routes are posted
let resolveRoutesReady = null;
const routesReadyPromise = new Promise((res) => {
  resolveRoutesReady = res;
});

// Optional timeout if <Routes> never mounts
const routesReadyOrTimeout = (ms = 1200) =>
  Promise.race([
    routesReadyPromise,
    new Promise((r) => setTimeout(r, ms))
  ]);

function normalize(p) {
  return p.replace(/\/+/g, "/");
}

function join(base, child) {
  if (!child) return base || "";
  if (child.startsWith("/")) return child;
  return normalize(`${base.replace(/\/$/, "")}/${child}`);
}

function flattenRoutes(node, base = "", acc = new Set()) {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;

    const isRoute =
      child.type === RRD.Route ||
      (typeof child.type === "function" && child.type.name === "Route");

    if (isRoute) {
      const props = child.props || {};
      const { path, index, children } = props;

      const cur = index ? (base || "/") : (path ? join(base, path) : base);

      if (index || path) acc.add(cur || "/");
      if (children) flattenRoutes(children, cur, acc);
    } else {
      const kids = child.props?.children;
      if (kids) flattenRoutes(kids, base, acc);
    }
  });

  return acc;
}

function postAllRoutesOnce(children) {
  if (routesPosted) return;

  try {
    const list = Array.from(flattenRoutes(children)).sort();

    if (process.env.NODE_ENV === "development") {
      console.log("Routes:", list);
    }

    if (!window.__ROUTE_MESSAGING_ENABLED__) return;

    if (window.top && window.top !== window) {
      const routesForMessage = list.map((route) => ({
        path: route
      }));

      const routesMessage = {
        type: "ROUTES_INFO",
        routes: routesForMessage,
        timestamp: Date.now()
      };

      window.top.postMessage(routesMessage, "*");
    }
  } finally {
    routesPosted = true;
    resolveRoutesReady?.();
    resolveRoutesReady = null;
  }
}

/** Our patched <Routes/> that posts route list once. */
export function Routes(props) {
  React.useEffect(() => {
    postAllRoutesOnce(props.children);
  }, []);

  return React.createElement(RRD.Routes, { ...props });
}

/** --------------------- Outbound: route change events --------------------- */
let lastEmittedPath = "";

function emitRouteChange(location) {
  const path = `${location.pathname}${location.search}${location.hash}`;
  if (path === lastEmittedPath) return;

  lastEmittedPath = path;

  if (!window.__ROUTE_MESSAGING_ENABLED__) return;

  if (window.top && window.top !== window) {
    const msg = {
      type: "ROUTE_CHANGE",
      path: location.pathname,
      hash: location.hash,
      search: location.search,
      fullPath: location.pathname + location.search + location.hash,
      fullUrl: window.location.href,
      timestamp: Date.now()
    };

    window.top.postMessage(msg, "*");
  }
}

/** --------------------- Inbound: commands from parent --------------------- */

function RouterBridge() {
  const location = RRD.useLocation();
  const navigate = RRD.useNavigate();

  React.useEffect(() => {
    (async () => {
      await routesReadyOrTimeout();
      emitRouteChange(location);
    })();
  }, [location.key, location.pathname, location.search, location.hash]);

  React.useEffect(() => {
    function onMessage(e) {
      const data = e.data;
      if (!data) return;

      if (!window.__ROUTE_MESSAGING_ENABLED__) return;

      try {
        if (data.type === "ROUTE_CONTROL") {
          const action = data.action;
          const path = data.path;
          const replace = data.replace || false;

          console.log("Received route control:", data);

          switch (action) {
            case "navigate":
              if (path) {
                navigate(path, { replace });
                console.log(`Navigated to ${path}`);
              } else {
                console.error("navigate requires path");
              }
              break;

            case "back":
              navigate(-1);
              break;

            case "forward":
              navigate(1);
              break;

            case "replace":
              if (path) navigate(path, { replace: true });
              break;

            default:
              console.warn("Unknown ROUTE_CONTROL action:", action);
          }
        }

        if (data.type === "RELOAD") {
          window.location.reload();
        }
      } catch (err) {
        console.error("Route control error:", err);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [navigate]);

  return null;
}

/** Wrap routers so the bridge lives inside router context. */
function withBridge(children) {
  return (
    <>
      {children}
      <RouterBridge />
    </>
  );
}

export function HashRouter(props) {
  return (
    <RRD.HashRouter {...props}>
      {withBridge(props.children)}
    </RRD.HashRouter>
  );
}

export function BrowserRouter(props) {
  return (
    <RRD.BrowserRouter {...props}>
      {withBridge(props.children)}
    </RRD.BrowserRouter>
  );
}

// export function MemoryRouter(props) {
//   return (
//     <RRD.MemoryRouter {...props}>
//       {withBridge(props.children)}
//     </RRRD.MemoryRouter>
//   );
// }
