// src/theme.jsx
import { createTheme } from '@mui/material/styles';

// Typography configuration
const fontFamily = '"Poppins", sans-serif';

const typographyConfig = {
  // Simplified typography with only 4 sizes
  title: {
    fontSize: '24px', // Title
    fontWeight: 600,
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: '20px', // Subtitle
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontSize: '14px', // Body
    fontWeight: 400,
    lineHeight: 1.5,
  },
  text: {
    fontSize: '12px', // Text
    fontWeight: 400,
    lineHeight: 1.5,
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#764ba2',
      light: '#9c7bb0',
      dark: '#5a3a7a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#667eea',
      light: '#8a9ff7',
      dark: '#4c5fb8',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#2196f3',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
  },

  typography: {
    fontFamily: fontFamily,
    ...typographyConfig,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          height: '100%',
          margin: 0,
          padding: 0,
        },
        body: {
          fontFamily: fontFamily,
          backgroundColor: '#f7f7f7',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontFamily: fontFamily,
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        fontFamily: fontFamily,
        variant: 'body', // Default to body variant if not specified
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px !important',
          fontFamily: fontFamily,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px !important',
          fontFamily: fontFamily,
        },
      },
    },
  },
});

export default theme;
