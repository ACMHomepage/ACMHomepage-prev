import React from 'react';
import Toggle from './Toggle.jsx';
import { Switch, Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { toggle as toggleDarkMode } from '../store/darkmodeSlice';

function DarkToggle({ autofill, className }: any) {
  const { isDark } = useSelector((state) => (state as any).darkmode);
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
    <React.Fragment>
      <div className="fixed w-full bg-second z-50">
        <nav className={`util-main-part flex items-center space-x-4 py-3 h-12`}>
          <span className="font-bold flex-1">ACM Homepage</span>
          <DarkToggle className="hidden md:block" />
          <MenuList className="md:hidden" />
        </nav>
      </div>
      <div className="h-12" />
    </React.Fragment>
  );
}