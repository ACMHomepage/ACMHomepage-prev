import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Label } from 'theme-ui';
import { useColorMode } from 'theme-ui';

import { toggle as toggleDarkMode } from '../store/darkmodeSlice';
import { utilMainPart } from '../config';
import { mRV } from '../util/anotherTheme';
import PureSwitch from './PureSwitch';

interface DarkToggleProps {
  className?: string;
}

function DarkToggle({ className }: DarkToggleProps) {
  const { isDark } = useSelector((state) => (state as any).darkmode);
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = useColorMode();
  console.log(isDark, colorMode);
  if(isDark && colorMode !== 'dark') {
    setColorMode('dark');
  }
  if(!isDark && colorMode === 'dark') {
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
          className={`inline-flex items-center rounded border border-green-900
              dark:border-white p-1 text-sm h-8 shadow-md bg-first`}
        >
          <span className="hidden sm:block">Menu</span>
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
            className={`bg-first absolute right-0 w-60 top-10 rounded border
                  border-green-900 shadow-md dark:border-white p-2`}
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
        bg: 'secondaryBg',
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
