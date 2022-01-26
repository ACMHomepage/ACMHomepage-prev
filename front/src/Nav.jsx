import React, { useState } from 'react';
import Toggle from './Toggle.jsx';
import { Switch } from '@headlessui/react';
import { Menu } from 'lucide-react';

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
    <button
      type="button"
      className={`inline-flex items-center rounded border border-green-900
          dark:border-white p-1 text-sm`}
    >
      Menu
      <Menu size={20} />
    </button>
  );
}

export default function Nav() {
  return (
    <nav className="main-part py-3 flex items-center space-x-4">
      <span className="text-grenn-900 font-bold flex-1">ACM Homepage</span>
      <DarkToggle />
      <MenuList />
    </nav>
  );
}
