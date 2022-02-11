import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import isUndefined from 'lodash/isUndefined';
import { Menu as MenuIcon } from 'lucide-react';

import { setColor, setBorder } from '../util/theme';
import Button from './Button';
import DarkToggle from './DarkToggle';

interface MenuProps {
  contentAlign?: 'start' | 'center' | 'end';
  className?: string;
}

/**
 * Menu, props:
 * - contentAlign: `'start'` | `'center'`(default) | `'end'`.
 * - className: `<STRING>` | undefined.
 */
export default (props: MenuProps) => {
  let { contentAlign, className } = props;
  if (isUndefined(contentAlign)) contentAlign = 'center';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={className}>
        <Button
          withBorder
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <MenuIcon size={20} />
          Menu
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={12}
        align={contentAlign}
        sx={{
          width: '14rem',
          p: '0.5rem',
          ...setColor('text', 'background'),
          ...setBorder(),
        }}
      >
        <DropdownMenu.Item onSelect={(event: Event) => event.preventDefault()}>
          <DarkToggle />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
