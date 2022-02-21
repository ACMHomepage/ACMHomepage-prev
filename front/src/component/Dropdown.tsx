import { Menu } from '@headlessui/react';
import { Menu as MenuIcon, LogIn } from 'lucide-react';

import Button from './Button';
import LogButton from './LogButton';
import DarkToggle from './DarkToggle';
import { setColor, setBorder, mRV } from '../util/theme';

interface DropdownProps {
  className?: string;
}

/**
 * Props:
 * - className: `<STRING>` | undefined.
 */
export default ({ className }: DropdownProps) => {
  return (
    <Menu as="div" className={className}>
      <Menu.Button as="div">
        <Button
          sx={{
            height: '2rem',
            ...setBorder({ width: '2px', color: 'bg-6' }),
            ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
          }}
        >
          <MenuIcon size={20} />
          Menu
        </Button>
      </Menu.Button>
      <div sx={{ position: 'relative' }}>
        <Menu.Items
          as="div"
          sx={{
            position: 'absolute',
            top: '0.25rem',
            right: '0rem',
            width: '16rem',
            py: '0.5rem',
            ...setColor({ bg: 'bg-2' }),
            ...setBorder({ color: 'bg-6', width: '2px' }),
          }}
        >
          <Menu.Item
            as={DarkToggle}
            sx={{
              px: '0.5rem',
              py: '0.5rem',
              ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
              ...setBorder({ radius: '0px', width: '0px' }),
            }}
          />
          <Menu.Item
            as={LogButton}
            sx={{
              gap: '0.25rem',
              width: '100%',
              placeContent: 'start',
              px: '0.5rem',
              py: '0.5rem',
              ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
            }}
          />
        </Menu.Items>
      </div>
    </Menu>
  );
};
