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
} from '@mui/material';
import {
  DashboardOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
  AnalyticsOutlined,
  PeopleOutlined,
  LockOutlined,
} from '@mui/icons-material';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
  },
  {
    text: 'Analytics',
    icon: <AnalyticsOutlined />,
    path: '/analytics',
    allowedRoles: ['admin'],
  },
  {
    text: 'Users',
    icon: <PeopleOutlined />,
    path: '/users',
    allowedRoles: ['admin'],
  },
  {
    text: 'Profile',
    icon: <AccountCircleOutlined />,
    path: '/profile',
  },
  {
    text: 'Settings',
    icon: <SettingsOutlined />,
    path: '/settings',
  },
];

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="white" fontWeight="bold">
              A
            </Typography>
          </Box>
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            Admin Portal
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map((item) => {
          const isAllowed = !item.allowedRoles || (user && item.allowedRoles.includes(user.role));

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => isAllowed && handleNavigation(item.path)}
                selected={location.pathname === item.path}
                disabled={!isAllowed}
                sx={{
                  borderRadius: 2,
                  opacity: isAllowed ? 1 : 0.6,
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
                    backgroundColor: isAllowed ? 'action.hover' : 'transparent',
                    cursor: isAllowed ? 'pointer' : 'not-allowed',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                  }}
                >
                  {isAllowed ? item.icon : <LockOutlined />}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Admin Portal v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;