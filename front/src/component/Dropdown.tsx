import { Menu as MenuIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import { merge } from 'lodash';
import {
  layout,
  size,
  border,
  bg,
  spacing,
  flexbox,
  font,
  text,
  outline,
} from '@acm-homepage/theme-shortcut';

import useOutsideListener from '../util/outsideListener';

import Button from './Button';
import SignButton from './SignButton';
import DarkToggle from './DarkToggle';
import { PostNews } from './Nav';

interface MenuProps {
  className?: string;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

/**
 * @param props - It holds:
 * - `className`: `<string>` | `undefined`.
 * - `children`: `<React.ReactNode>`
 */
const Menu = (props: MenuProps) => {
  const { className, children, open, setOpen } = props;
  const ref = useRef(null);
  useOutsideListener(ref, () => {
    if (open) setOpen(false);
  });

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

Menu.toggleOpen = (open: boolean, setOpen: (open: boolean) => void) => () => {
  setOpen(!open);
};

Menu.unopen = (open: boolean, setOpen: (open: boolean) => void) => () => {
  if (open) {
    setOpen(false);
  }
};

interface MenuItemsProps {
  self: React.ReactElement;
  open: boolean;
}

Menu.Items = function MenuItems(props: MenuItemsProps) {
  const { self, open } = props;

  return open ? self : null;
};

interface DropdownProps {
  buttonSx?: ThemeUIStyleObject;
  className?: string;
}

/**
 * @param props - It holds:
 * - `buttonSx`: `<ThemeUIStyleObject>` | undefined.
 * - `className`: `<string>` | `undefined`.
 */
export default ({ buttonSx, className }: DropdownProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Menu
      sx={layout({ pos: 'relative' })}
      open={open}
      setOpen={setOpen}
      className={className}
    >
      <Button
        sx={merge(
          size({ h: '2rem' }),
          border({ width: '1px', col: 'bg-4' }),
          bg({ col: { _: 'bg-2', hover: 'bg-4' } }),
          buttonSx,
        )}
        onClick={Menu.toggleOpen(open, setOpen)}
      >
        <MenuIcon size={20} />
        Menu
      </Button>
      <Menu.Items
        open={open}
        self={
          <div
            sx={merge(
              layout({ pos: 'absolute', t: '2.5rem', r: 0 }),
              size({ w: '16rem' }),
              spacing({ p: { t: '0.5rem', b: '0.5rem' } }),
              bg({ col: 'bg-2' }),
              border({ width: '1px', col: 'bg-4', radius: '0.25rem' }),
            )}
          >
            <DarkToggle
              sx={merge(
                bg({ col: { _: 'bg-2', hover: 'bg-4' } }),
                spacing({ p: '0.5rem' }),
                size({ h: '2.5rem' }),
                border({ width: '0px', radius: '0px' }),
                outline({ width: { hover: '2px' } }),
              )}
            />
            <SignButton
              sx={merge(
                flexbox({ gap: '0.25rem', place: { content: 'start' } }),
                size({ h: '2.5rem', w: '100%' }),
                spacing({ p: '0.5rem' }),
                bg({ col: { _: 'bg-2', hover: 'bg-4' } }),
                border({ radius: '0px', width: '0px' }),
                font({ size: 'base' }),
                text({ col: 'fg-0' }),
              )}
            />
            <PostNews
              sx={merge(
                size({ w: '100%', h: '2.5rem' }),
                flexbox({ place: { content: 'start' } }),
                font({ size: 'base' }),
                text({ col: 'fg-0' }),
                spacing({ p: '0.5rem' }),
                border({ width: '0px' }),
              )}
            />
          </div>
        }
      />
    </Menu>
  );
};
