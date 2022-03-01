import { Menu as MenuIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import { merge } from 'lodash';

import { setColor, setBorder, setOutline, setFont } from '../util/theme';
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
      sx={{ position: 'relative' }}
      open={open}
      setOpen={setOpen}
      className={className}
    >
      <Button
        sx={merge(
          {
            height: '2rem',
            ...setBorder({ width: '2px', color: 'bg-4' }),
            ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
          },
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
            sx={{
              position: 'absolute',
              top: '2.5rem',
              right: 0,
              width: '16rem',
              py: '0.5rem',
              ...setColor({ bg: 'bg-2' }),
              ...setBorder({ width: '2px', color: 'bg-4' }),
            }}
          >
            <DarkToggle
              sx={{
                ':hover': { bg: 'bg-4' },
                p: '0.5rem',
                height: '2.5rem',
                ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
                ...setBorder({ radius: '0px', width: '0px' }),
                ':focus': { ...setOutline() },
              }}
            />
            <SignButton
              sx={{
                gap: '0.25rem',
                width: '100%',
                height: '2.5rem',
                placeContent: 'start',
                p: '0.5rem',
                ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
                ...setBorder({ radius: '0px', width: '0px' }),
                ...setFont({ size: 'base', color: 'fg-0' }),
              }}
            />
            <PostNews
              sx={{
                p: '0.5rem',
                width: '100%',
                height: '2.5rem',
                placeContent: 'start',
                ...setFont({ size: 'base', color: 'fg-0' }),
              }}
            />
          </div>
        }
      />
    </Menu>
  );
};
