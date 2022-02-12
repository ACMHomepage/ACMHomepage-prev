import { Label } from 'theme-ui';
import { useColorMode } from 'theme-ui';

import PureSwitch from './PureSwitch';

export type ColorMode = 'light' | 'dark';

/**
 * Return darktoggle click function.
 * @param colorMode Current color mode. use `useColorMode` hook to get.
 * @param setColorMode Color mode handle, use `useColorMode` hook to get.
 * @returns `() => void`, function.
 */
const click =
  (colorMode: ColorMode, setColorMode: (colorMode: ColorMode) => void) =>
  (_event: Event): void => {
    if (colorMode === 'dark') {
      setColorMode('light');
    } else {
      setColorMode('dark');
    }
  };

interface DarkToggleProps {
  className?: string;
}

/**
 * Return a dark mode toggle.
 */
export default ({ className }: DarkToggleProps) => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Label
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        width: 'auto',
        cursor: 'pointer',
      }}
      className={className}
    >
      <span sx={{ flex: 1 }}>Dark Mode</span>
      <PureSwitch
        checked={colorMode === 'dark'}
        onChange={click(colorMode as ColorMode, setColorMode)}
      />
    </Label>
  );
};
