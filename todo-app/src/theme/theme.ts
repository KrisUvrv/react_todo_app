import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#1976d2',
    },

    secondary: {
      main: '#9c27b0',
    },

    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },

  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),

    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },

    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          width: 56,
          height: 56,
        },
      },
    },
  },
});

export default theme;
