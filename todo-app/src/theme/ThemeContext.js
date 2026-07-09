import { createContext, useContext, useEffect, useMemo, useState, } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
const ColorModeContext = createContext(null);
export const useColorMode = () => {
    const context = useContext(ColorModeContext);
    if (!context) {
        throw new Error('useColorMode must be used inside ThemeContextProvider');
    }
    return context;
};
export function ThemeContextProvider({ children }) {
    const [mode, setMode] = useState((localStorage.getItem('theme') || 'light'));
    useEffect(() => {
        localStorage.setItem('theme', mode);
    }, [mode]);
    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
    }), [mode]);
    return (<ColorModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>);
}
