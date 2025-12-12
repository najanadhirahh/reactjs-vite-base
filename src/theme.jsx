// src/theme.jsx
import { createTheme } from '@mui/material/styles';

// Typography configuration
const fontFamily = '"Poppins", sans-serif';

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
    // Standardizing to REM units (Base 16px)
    // 24px = 1.5rem
    // 20px = 1.25rem
    // 16px = 1rem
    // 14px = 0.875rem
    // 12px = 0.75rem

    // Custom variants (Mapping to standard logic)
    title: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    subtitle: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    text: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.5,
    },

    // Standard MUI variants
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 }, // Matches 'title'
    h5: { fontSize: '1.25rem', fontWeight: 600 }, // Matches 'subtitle'
    h6: { fontSize: '1rem', fontWeight: 600 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 }, // Matches 'body' / Dashboard text
    body2: { fontSize: '0.75rem', lineHeight: 1.5 }, // Matches 'text' / Table dense text
    button: { textTransform: 'none', fontWeight: 500 },
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
          borderRadius: 8,
          // Remove custom font-size override to inherit standard 'button' typography
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          title: 'h4',
          subtitle: 'h5',
          body: 'p',
          text: 'span',
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // 14px standardized
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // 14px standardized
        },
      },
    },

    // Ensure DataGrid uses standard fonts
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // Ensure grid text matches body size
        }
      }
    }
  },
});

export default theme;
