import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import baseTheme from '../theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const createCustomTheme = (mode, primaryColor, fontFamily) => {
  return createTheme({
    // Spread all settings from base theme
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode,
      primary: {
        ...baseTheme.palette.primary,
        main: primaryColor,
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      ...baseTheme.typography,
      fontFamily: fontFamily,
    },
    components: {
      ...baseTheme.components,
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            borderRight: mode === 'light' ? '1px solid #e0e0e0' : '1px solid #333',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            color: mode === 'light' ? '#000000' : '#ffffff',
            boxShadow: mode === 'light' ? '0 1px 3px rgba(0,0,0,0.12)' : '0 1px 3px rgba(255,255,255,0.12)',
          },
        },
      },
    },
  });
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });
  
  const [primaryColor, setPrimaryColor] = useState(() => {
    const savedColor = localStorage.getItem('primaryColor');
    return savedColor || baseTheme.palette.primary.main;
  });
  
  const [fontFamily, setFontFamily] = useState(() => {
    const savedFont = localStorage.getItem('fontFamily');
    return savedFont || baseTheme.typography.fontFamily;
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createCustomTheme(mode, primaryColor, fontFamily);

  const value = {
    mode,
    primaryColor,
    fontFamily,
    toggleColorMode,
    setPrimaryColor,
    setFontFamily,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};