import { Menu } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';

import Button from './Button';
import DarkToggle from './DarkToggle';
import { setColor, setBorder } from '../util/theme';

interface DropdownProps {
  className?: string;
};

/**
 * Props:
 * - className: `<STRING>` | undefined.
 */
export default ({ className }: DropdownProps) => {
  return (
    <Menu as="div" className={className}>
      <Menu.Button as="div">
        <Button withBorder>
          <MenuIcon size={20} />
          Menu
        </Button>
      </Menu.Button>
      <div sx={{ position: 'relative' }}>
        <Menu.Items as="div" sx={{
          position: 'absolute',
          top: '0.25rem',
          right: '0rem',
          width: '16rem',
          p: '0.5rem',
          ...setColor('text', 'background'),
          ...setBorder(),
        }}>
          <Menu.Item as={DarkToggle} />
        </Menu.Items>
      </div>
    </Menu>
  )
};
