import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useColorMode } from './ThemeContext.tsx';

export default function ThemeSwitcher() {
    const { mode, toggleTheme } = useColorMode();

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
    );
}
