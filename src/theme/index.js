import React from 'react';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';

const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: 'light' });

export function useColorMode() {
  return React.useContext(ColorModeContext);
}

export function AppThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(() => localStorage.getItem('color-mode') || (prefersDarkMode ? 'dark' : 'light'));

  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('color-mode', next);
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === 'light' ? '#1D3557' : '#A8DADC' }, // premium navy / soft teal
          secondary: { main: '#E9C46A' }, // warm gold
          background: {
            default: mode === 'light' ? '#F8FAFC' : '#0B0F1A',
            paper: mode === 'light' ? '#FFFFFF' : '#111827',
          },
          text: {
            primary: mode === 'light' ? '#0F172A' : '#E5E7EB',
            secondary: mode === 'light' ? '#475569' : '#9CA3AF',
          },
          success: { main: '#2A9D8F' },
          error: { main: '#E76F51' },
          warning: { main: '#F4A261' },
          info: { main: '#457B9D' },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
          h1: { fontWeight: 700, letterSpacing: '-0.5px' },
          h2: { fontWeight: 700, letterSpacing: '-0.5px' },
          h3: { fontWeight: 700 },
          button: { textTransform: 'none', fontWeight: 600 },
        },
        shadows: [
          'none',
          '0px 1px 2px rgba(16,24,40,0.06), 0px 1px 3px rgba(16,24,40,0.10)',
          '0px 2px 4px rgba(16,24,40,0.06), 0px 2px 6px rgba(16,24,40,0.10)',
          ...Array(22).fill('0 6px 16px rgba(0,0,0,0.08)'),
        ],
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: { borderRadius: 10, paddingInline: 16 },
              containedPrimary: { boxShadow: '0 8px 20px rgba(29,53,87,0.2)' },
            },
            variants: [
              { props: { variant: 'soft' }, style: { background: 'rgba(29,53,87,0.08)', color: '#1D3557' } },
            ],
          },
          MuiAppBar: {
            styleOverrides: { root: { backgroundImage: 'linear-gradient(90deg, #1D3557, #26496E)' } },
          },
          MuiPaper: {
            styleOverrides: { rounded: { borderRadius: 16 } },
          },
          MuiCard: {
            styleOverrides: { root: { borderRadius: 16, border: '1px solid rgba(2,6,23,0.06)' } },
          },
          MuiChip: {
            styleOverrides: { root: { borderRadius: 8 } },
          },
          MuiContainer: {
            defaultProps: { maxWidth: 'lg' },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
