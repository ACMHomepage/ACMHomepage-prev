import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Label } from 'theme-ui';
import { useColorMode } from 'theme-ui';

import { toggle as toggleDarkMode } from '../store/darkmodeSlice';
import { utilMainPart } from '../config';
import { mRV, setColor } from '../util/theme';
import PureSwitch from './PureSwitch';

interface DarkToggleProps {
  className?: string;
}

function DarkToggle({ className }: DarkToggleProps) {
  const { isDark } = useSelector((state) => (state as any).darkmode);
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = useColorMode();
  if (isDark && colorMode !== 'dark') {
    setColorMode('dark');
  }
  if (!isDark && colorMode === 'dark') {
    setColorMode('light');
  }

  return (
    <Label
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        width: 'auto',
        cursor: 'pointer',
      }}
      className={className}
    >
      <span sx={{ flex: 1 }}>Dark Mode</span>
      <PureSwitch
        checked={isDark}
        onChange={() => dispatch(toggleDarkMode())}
      />
    </Label>
  );
}

function MenuList(props: any) {
  const { className } = props;

  return (
    <div className={classNames('relative', className)}>
      <Menu>
        <Menu.Button
          type="button"
          sx={{
            display: 'inline-flex',
            itemAlign: 'center',
            borderRadius: '0.25rem',
            gap: '0.25rem',
            borderWidth: '1px',
            borderColor: 'text',
            background: 'background',
            padding: '0.25rem',
            height: '2rem',
            fontSize: 'sm',
          }}
        >
          <span sx={{ display: mRV({ _: 'none', sm: 'block' }) }}>Menu</span>
          <MenuIcon size={20} />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-90"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90"
        >
          <Menu.Items
            sx={{
              position: 'absolute',
              width: '14rem',
              right: '0rem',
              top: '3rem',
              p: '0.5rem',
              borderRadius: 'normal',
              borderWidth: '1px',
              ...setColor('text', 'background'),
            }}
          >
            <Menu.Item>{({ active }) => <DarkToggle autofill />}</Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default function Nav() {
  return (
    <div
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        bg: 'secondaryBackground',
        zIndex: 50,
      }}
    >
      <nav
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& > * + *': { marginLeft: '1rem' },
          py: '0.75rem',
          height: '3rem',
          ...utilMainPart,
        }}
      >
        <span sx={{ fontWeight: 'bold', flex: 1 }}>ACM Homepage</span>
        <DarkToggle sx={{ display: mRV({ _: 'none', md: 'flex' }) }} />
        <MenuList className="md:hidden" />
      </nav>
    </div>
  );
}
