import { Menu as MenuIcon } from 'lucide-react';
import { useState, useRef } from 'react';

import Button from './Button';
import LogButton from './LogButton';
import DarkToggle from './DarkToggle';
import { setColor, setBorder, mRV, setOutline } from '../util/theme';
import useOutsideListener from '../util/outsideListener';

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
  className?: string;
}

/**
 * @param props - It holds:
 * - className: `<STRING>` | undefined.
 */
export default ({ className }: DropdownProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Menu sx={{ position: 'relative' }} open={open} setOpen={setOpen}>
      <Button
        sx={{
          height: '2rem',
          ...setBorder({ width: '2px', color: 'bg-4' }),
          ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
        }}
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
                ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
                ...setBorder({ radius: '0px', width: '0px' }),
                ':focus': { ...setOutline() },
              }}
            />
            <LogButton
              sx={{
                gap: '0.25rem',
                width: '100%',
                placeContent: 'start',
                p: '0.5rem',
                ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
                ...setBorder({ radius: '0px', width: '0px' }),
              }}
            />
          </div>
        }
      />
    </Menu>
  );
};
