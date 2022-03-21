import { useColorMode } from 'theme-ui';
import { Moon, Sun } from 'lucide-react';
import { merge } from 'lodash';
import {
  layout,
  flexbox,
  size,
  interactivity,
} from '@acm-homepage/theme-shortcut';

import PureSwitch from './PureSwitch';

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
  showText?: boolean;
}

/**
 * Return a dark mode toggle component.
 * @param props It holds:
 * - className: `<string>` | `undefined`. Set its class.
 * - showText: `true`(default) | `false`. Set if show the text `Dark Mode` or
 *   not.
 */
export default (props: DarkToggleProps) => {
  let { className, showText = true } = props;
  const [colorMode, setColorMode] = useColorMode();

  return (
    <label
      tabIndex={0}
      sx={merge(
        layout({ display: 'flex' }),
        flexbox({ align: { items: 'center' }, gap: '0.5rem' }),
        size({ w: 'auto' }),
        interactivity({ cursor: 'pointer' }),
      )}
      className={className}
    >
      {showText ? (
        <span
          sx={merge(
            layout({ display: 'flex' }),
            flexbox({ flex: 1, gap: '0.25rem', align: { items: 'center' } }),
          )}
        >
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
    </label>
  );
};
