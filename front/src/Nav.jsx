import React, { useState } from 'react';
import Toggle from './Toggle.jsx';
import { Switch } from '@headlessui/react';

function DarkToggle() {
  const [darkEnabled, setDarkEnabled] = useState(false);

  if (darkEnabled) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <Switch.Group>
      <Switch.Label className="px-1">Dark mode</Switch.Label>
      <Toggle enabled={darkEnabled} setEnabled={setDarkEnabled}/>
    </Switch.Group>
  );
}

export default function Nav() {
  return (
    <nav className="mx-auto w-10/12 py-3 flex">
      <span className="text-grenn-900 font-bold flex-1">
        ACM Homepage
      </span>
      <DarkToggle />
    </nav>
  );
}
