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

import useOutsideListener from '../../util/outsideListener';

import Button from '../Button';
import DarkToggleItem from './DarkToggleItem';
import SignItem from './SignItem';
import PostNewsItem from './PostNewsItem';

import styles from './styles/Dropdown.module.scss';

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
      <button
        className={styles.button}
        onClick={Menu.toggleOpen(open, setOpen)}
      >
        <MenuIcon size={20} />
      </button>
      <Menu.Items
        open={open}
        self={
          <div className={styles.list}>
            <DarkToggleItem />
            <SignItem />
            <PostNewsItem />
          </div>
        }
      />
    </Menu>
  );
};
