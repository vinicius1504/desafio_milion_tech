import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

type PaletteMode = 'light' | 'dark';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as PaletteMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#2563eb' : '#3b82f6',
            light: mode === 'light' ? '#60a5fa' : '#93c5fd',
            dark: mode === 'light' ? '#1e40af' : '#1d4ed8',
            contrastText: '#ffffff',
          },
          secondary: {
            main: mode === 'light' ? '#7c3aed' : '#8b5cf6',
            light: mode === 'light' ? '#a78bfa' : '#c4b5fd',
            dark: mode === 'light' ? '#5b21b6' : '#6d28d9',
            contrastText: '#ffffff',
          },
          error: {
            main: mode === 'light' ? '#dc2626' : '#ef4444',
            light: mode === 'light' ? '#f87171' : '#fca5a5',
            dark: mode === 'light' ? '#991b1b' : '#b91c1c',
          },
          warning: {
            main: mode === 'light' ? '#f59e0b' : '#fbbf24',
            light: mode === 'light' ? '#fcd34d' : '#fde68a',
            dark: mode === 'light' ? '#d97706' : '#f59e0b',
          },
          info: {
            main: mode === 'light' ? '#0ea5e9' : '#38bdf8',
            light: mode === 'light' ? '#7dd3fc' : '#bae6fd',
            dark: mode === 'light' ? '#0284c7' : '#0ea5e9',
          },
          success: {
            main: mode === 'light' ? '#10b981' : '#34d399',
            light: mode === 'light' ? '#6ee7b7' : '#a7f3d0',
            dark: mode === 'light' ? '#059669' : '#10b981',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
          text: {
            primary: mode === 'light' ? '#0f172a' : '#f1f5f9',
            secondary: mode === 'light' ? '#475569' : '#94a3b8',
          },
          divider: mode === 'light' ? '#e2e8f0' : '#334155',
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
            letterSpacing: '-0.02em',
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          },
          h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
          h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
          },
          h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
          },
          h6: {
            fontSize: '1rem',
            fontWeight: 600,
          },
          button: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: [
          'none',
          mode === 'light'
            ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
            : '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
          mode === 'light'
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
          mode === 'light'
            ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
            : '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
          mode === 'light'
            ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
            : '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
          mode === 'light'
            ? '0 25px 50px -12px rgb(0 0 0 / 0.25)'
            : '0 25px 50px -12px rgb(0 0 0 / 0.5)',
          ...Array(19).fill(
            mode === 'light'
              ? '0 25px 50px -12px rgb(0 0 0 / 0.25)'
              : '0 25px 50px -12px rgb(0 0 0 / 0.5)'
          ),
        ] as any,
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              },
              contained: {
                '&:hover': {
                  transform: 'translateY(-1px)',
                  transition: 'transform 0.2s',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow:
                  mode === 'light'
                    ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                    : '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
                border: mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              variant: 'outlined',
            },
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 8,
                  backgroundColor: mode === 'light' ? '#ffffff' : '#1e293b',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: mode === 'light' ? '#f8fafc' : '#334155',
                  },
                  '&.Mui-focused': {
                    backgroundColor: mode === 'light' ? '#ffffff' : '#1e293b',
                  },
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow:
                  mode === 'light'
                    ? '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                    : '0 1px 3px 0 rgb(0 0 0 / 0.4)',
                backgroundImage: 'none',
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderColor: mode === 'light' ? '#e2e8f0' : '#334155',
              },
              head: {
                fontWeight: 600,
                backgroundColor: mode === 'light' ? '#f8fafc' : '#0f172a',
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 500,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
