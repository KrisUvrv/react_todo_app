import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';

import { useColorMode } from './ThemeContext.tsx';

export default function ThemeSwitcher() {
  const { mode, toggleTheme } = useColorMode();

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
      }}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
