import { Moon, Sun } from 'lucide-react';
import { useThemeMode } from '../../api/themeMode';

import styles from './styles/DarkToggleItem.module.scss';

type ThemeMode = ReturnType<typeof useThemeMode>;

const handleChangeThemeMode = (themeMode: ThemeMode) => () => {
  themeMode.setNext();
};

/**
 * Return a dark mode toggle component.
 */
const DarkToggleItem = () => {
  const themeMode = useThemeMode();

  return (
    <div
      onClick={handleChangeThemeMode(themeMode)}
      className={styles.darkToggleItem}
    >
      {themeMode.val === 'light' ? <Sun /> : <Moon />}
      Toggle Dark Theme
    </div>
  );
};

export default DarkToggleItem;
