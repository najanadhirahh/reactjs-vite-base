import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from '../Sidebar';
import AppBar from '../AppBar';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const drawerWidth = 240;
  const collapsedWidth = 60;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        drawerWidth={drawerWidth}
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        handleDrawerToggle={handleDrawerToggle}
        handleCollapseToggle={handleCollapseToggle}
        isMobile={isMobile}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            md: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`
          },
          // height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Spacer for AppBar */}
        <Box sx={{ height: 75 }} backgroundColor='#fff'
        />

        {/* Scrollable content area */}
        <Box
          backgroundColor='#fff'
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            pt: 2,
            px: { xs: 2, md: 1, lg: 1.5 },
            "&::-webkit-scrollbar": {
              display: "none",
            },
            transition: theme.transitions.create('padding', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;