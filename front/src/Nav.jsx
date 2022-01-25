import React, { useState } from 'react';
import Toggle from './Toggle.jsx';
import { Switch } from '@headlessui/react';

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
    <Switch.Group>
      <Switch.Label className="px-1">Dark Mode</Switch.Label>
      <Toggle enabled={darkEnabled} setEnabled={setDarkEnabled} />
    </Switch.Group>
  );
}

export default function Nav() {
  return (
    <nav className="mx-auto w-10/12 py-3 flex px-1">
      <span className="text-grenn-900 font-bold flex-1">ACM Homepage</span>
      <DarkToggle />
    </nav>
  );
}
