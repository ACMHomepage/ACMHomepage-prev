import { Menu } from '@headlessui/react';
import { Menu as MenuIcon, LogIn } from 'lucide-react';
import { darken } from '@theme-ui/color';

import Button from './Button';
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
        <Button withBorder>
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
            ...setColor('text', 'background'),
            ...setBorder(),
          }}
        >
          <Menu.Item
            as={DarkToggle}
            sx={{
              ':hover': { bg: darken('background', 0.1) },
              px: '0.5rem',
              py: '0.5rem',
              ...setBorder({ radius: '0px', width: '0px' }),
            }}
          />
          <Menu.Item
            as={Button}
            sx={{
              gap: '0.25rem',
              width: '100%',
              placeContent: 'start',
              px: '0.5rem',
              py: '0.5rem',
              ...setBorder({ radius: '0px', width: '0px' }),
            }}
          >
            <LogIn size={16} />
            Log in / Log on
          </Menu.Item>
        </Menu.Items>
      </div>
    </Menu>
  );
};
