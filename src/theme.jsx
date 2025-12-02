// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#764ba2',   // matches your gradient purple
    },
    secondary: {
      main: '#667eea',   // your second gradient color
    },
    background: {
      default: '#f7f7f7',
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.95rem',
    },
  },

  components: {
    // Removes browser padding/margins to help centering
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `,
    },

    // Optional: rounder inputs
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
        },
      },
    },
  },
});

export default theme;
