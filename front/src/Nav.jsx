import React, { useState } from 'react';
import Toggle from './Toggle.jsx';
import { Switch, Menu } from '@headlessui/react';
import { Menu as MenuIcon } from 'lucide-react';

function DarkToggle() {
  const isDark = JSON.parse(localStorage.getItem('isDark') || 'false');
  const [darkEnabled, setDarkEnabled] = useState(isDark);

  if (darkEnabled) {
    localStorage.setItem('isDark', 'true');
    document.documentElement.classList.add('dark');
  } else {
    localStorage.setItem('isDark', 'false');
    document.documentElement.classList.remove('dark');
  }

  return (
    <div className="flex space-x-1">
      <Switch.Group>
        <Switch.Label>Dark Mode</Switch.Label>
        <Toggle enabled={darkEnabled} setEnabled={setDarkEnabled} />
      </Switch.Group>
    </div>
  );
}

function MenuList() {
  return (
    <div className="relative md:hidden">
      <Menu>
        <Menu.Button
          type="button"
          className={`inline-flex items-center rounded border border-green-900
              dark:border-white p-1 text-sm h-8`}
        >
          <span className="hidden sm:block">Menu</span>
          <MenuIcon size={20} />
        </Menu.Button>
        <Menu.Items>
          <div className={`same-bg rounded border border-green-900 dark:border-white p-1
            absolute top-10 right-0 w-60`}>
            <Menu.Item>
              {({active}) => (<a>Hello</a>)}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default function Nav() {
  return (
    <nav className={`main-part same-bg sticky flex items-center space-x-4 py-3`}>
      <span className="text-grenn-900 font-bold flex-1">ACM Homepage</span>
      <DarkToggle />
      <MenuList />
    </nav>
  );
}
