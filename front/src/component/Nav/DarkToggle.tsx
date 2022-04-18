import { Moon, Sun } from 'lucide-react';
import { useThemeMode } from '../../api/themeMode';

import styles from './styles/DarkToggle.module.scss';

type ThemeMode = ReturnType<typeof useThemeMode>;

const handleChangeThemeMode = (themeMode: ThemeMode) => () => {
  themeMode.setNext();
};

/**
 * Return a dark mode toggle component.
 */
const DarkToggle = () => {
  const themeMode = useThemeMode();

  return (
    <button
      onClick={handleChangeThemeMode(themeMode)}
      className={styles.button}
    >
      {themeMode.val === 'light' ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkToggle;
