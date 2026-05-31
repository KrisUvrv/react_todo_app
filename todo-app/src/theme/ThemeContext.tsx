import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import {
    ThemeProvider,
    CssBaseline,
    createTheme,
} from '@mui/material';

type ThemeMode = 'light' | 'dark';

type ColorModeContextType = {
    mode: ThemeMode;
    toggleTheme: () => void;
};

const ColorModeContext = createContext<ColorModeContextType | null>(null);

export const useColorMode = () => {
    const context = useContext(ColorModeContext);

    if (!context) {
        throw new Error('useColorMode must be used inside ThemeContextProvider');
    }

    return context;
};

export function ThemeContextProvider({
                                         children,
                                     }: {
    children: ReactNode;
}) {
    const [mode, setMode] = useState<ThemeMode>('light');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
