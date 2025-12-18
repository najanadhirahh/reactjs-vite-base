import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  DashboardOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
  AnalyticsOutlined,
  PeopleOutlined,
  ChevronRight,
  ChevronLeft,
} from '@mui/icons-material';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
    requiredPermission: 'dashboard: view',
  },
  {
    text: 'Users',
    icon: <PeopleOutlined />,
    path: '/users',
    requiredPermission: 'user: view',
  },
  {
    text: 'Profile',
    icon: <AccountCircleOutlined />,
    path: '/profile',
    requiredPermission: 'profile: view',
  },
  {
    text: 'Settings',
    icon: <SettingsOutlined />,
    path: '/settings',
    requiredPermission: 'setting: view',
  },
];

const Sidebar = ({
  drawerWidth,
  collapsedWidth,
  mobileOpen,
  collapsed,
  handleDrawerToggle,
  handleCollapseToggle,
  isMobile
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  // Drawer content for collapsed state
  const collapsedDrawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{
        justifyContent: 'center',
        minHeight: '64px !important',
        px: 0
      }}>
        <IconButton
          onClick={handleCollapseToggle}
          color="inherit"
          size="small"
        >
          <ChevronRight />
        </IconButton>
      </Toolbar>

      <Divider />

      <List sx={{ flexGrow: 1, px: 0.5 }}>
        {menuItems
          .filter(item => !item.requiredPermission || user?.rolePermission?.includes(item.requiredPermission))
          .map((item) => (
            <ListItem key={item.text} disablePadding sx={{
              mb: 0.5,
              display: 'flex',
              justifyContent: 'center'
            }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  width: 40,
                  height: 40,
                  minHeight: 40,
                  justifyContent: 'center',
                  p: 0,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                    justifyContent: 'center',
                    margin: 0,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <Divider />

      <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" color="white" fontWeight="bold">
            A
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  // Drawer content for expanded state
  const expandedDrawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{
        justifyContent: 'space-between',
        minHeight: '64px !important',
        px: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: (theme) => theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="white" fontWeight="bold">
              A
            </Typography>
          </Box>
          <Typography variant="subtitle1" noWrap fontWeight="bold">
            Admin Portal
          </Typography>
        </Box>
        <IconButton
          onClick={handleCollapseToggle}
          size="small"
          sx={{ ml: 1 }}
        >
          <ChevronLeft />
        </IconButton>
      </Toolbar>

      <Divider />

      <List sx={{ flexGrow: 1, px: 1.5 }}>
        {menuItems
          .filter(item => !item.requiredPermission || user?.rolePermission?.includes(item.requiredPermission))
          .map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    fontSize: '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: {
          md: collapsed ? collapsedWidth : drawerWidth
        },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {expandedDrawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: collapsed ? collapsedWidth : drawerWidth,
            overflowX: 'hidden',
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {collapsed ? collapsedDrawer : expandedDrawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;