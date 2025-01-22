import { createTheme } from '@mui/material';

// Create a dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Customize primary color
    },
    secondary: {
      main: '#f48fb1', // Customize secondary color
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1d1d1d',   // Dark paper background
    },
  },
});
