import React, { useState } from 'react';
import Toggle from './Toggle.jsx';
import { Switch, Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { toggle as toggleDarkMode } from '../store/darkmodeSlice.js';

function DarkToggle({ autofill, className }) {
  const { isDark } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  return (
    <div className={classNames('flex space-x-1 items-center', className)}>
      <Switch.Group>
        <Switch.Label className={`${autofill ? 'flex-1' : ''}`}>
          Dark Mode
        </Switch.Label>
        <Toggle
          enabled={isDark}
          setEnabled={() => dispatch(toggleDarkMode())}
        />
      </Switch.Group>
    </div>
  );
}

function MenuList(props) {
  const { className } = props;

  return (
    <div className={classNames('relative', className)}>
      <Menu>
        <Menu.Button
          type="button"
          className={`inline-flex items-center rounded border border-green-900
              dark:border-white p-1 text-sm h-8 shadow-md`}
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
            className={`same-bg absolute right-0 w-60 top-10 rounded border
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
    <nav
      className={`main-part same-bg sticky flex items-center space-x-4 py-3`}
    >
      <span className="text-grenn-900 font-bold flex-1">ACM Homepage</span>
      <DarkToggle className="hidden md:block" />
      <MenuList className="md:hidden" />
    </nav>
  );
}
