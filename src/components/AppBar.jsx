import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  useTheme,
} from '@mui/material';
import {
  MenuOutlined,
  AccountCircleOutlined,
  LogoutOutlined,
  Brightness4Outlined,
  Brightness7Outlined,
} from '@mui/icons-material';
import { Menu as MenuIcon } from '@mui/icons-material';

const AppBar = ({ drawerWidth,collapsed,collapsedWidth, handleDrawerToggle, isMobile }) => {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useCustomTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/profile':
        return 'Profile';
      default:
        return 'Admin Portal';
    }
  };
  const theme = useTheme();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { 
          md: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` 
        },
        ml: { md: collapsed ? collapsedWidth : drawerWidth },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Box> */}
      {/* <Toolbar> */}
        {/* {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuOutlined />
          </IconButton>
        )}
         */}
        {/* <Typography variant="subtitle" noWrap component="div" sx={{ flexGrow: 1, display: 'block' }}>
          {getPageTitle()}
        </Typography> */}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'flex-end', gap: 1, width: '100%' }}>
          {/* <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'dark' ? <Brightness7Outlined /> : <Brightness4Outlined />}
          </IconButton> */}

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{ width: 32, height: 32 }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: { minWidth: 200 }
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="body" noWrap fontWeight="600" sx={{ display: 'block' }}>
                {user?.name}
              </Typography>
              <Typography variant="text" color="text.secondary" noWrap sx={{ display: 'block' }}>
                {user?.email}
              </Typography>
            </Box>
            
            <Divider />
            
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <AccountCircleOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;