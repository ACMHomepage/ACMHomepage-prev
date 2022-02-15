import { Label, useColorMode } from 'theme-ui';
import { Moon, Sun } from 'lucide-react';

import PureSwitch from './PureSwitch';
import type { ClickableSize } from '../config';
import { clickableSize } from '../config';

export type ColorMode = 'light' | 'dark';

/**
 * Return darktoggle click function.
 * @param colorMode Current color mode. use `useColorMode` hook to get.
 * @param setColorMode Color mode handle, use `useColorMode` hook to get.
 * @returns `() => void`, function.
 */
const onClickToChangeColor =
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
  size?: ClickableSize;
  showText?: boolean;
}

/**
 * Return a dark mode toggle component.
 * @param props It holds:
 * - className: `<string>` | `undefined`. Set its class.
 * - size: `<ClickableSize>`.
 * - showText: `true`(default) | `false`. Set if show the text `Dark Mode` or
 *   not.
 */
export default (props: DarkToggleProps) => {
  let { className, size, showText = true } = props;
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Label
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        width: 'auto',
        cursor: 'pointer',
        ...clickableSize(size),
      }}
      className={className}
    >
      {showText ? (
        <span sx={{ flex: 1, display: 'flex', gap: '0.25rem' }}>
          <Moon size={16} />
          Dark Mode
        </span>
      ) : null}
      <PureSwitch
        inner
        label={colorMode === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
        checked={colorMode === 'dark'}
        onChange={onClickToChangeColor(colorMode as ColorMode, setColorMode)}
      />
    </Label>
  );
};
