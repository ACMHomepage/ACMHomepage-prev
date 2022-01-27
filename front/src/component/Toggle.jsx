import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function Toggle(props) {
  const { enabled, setEnabled } = props;

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-green-500' : 'bg-green-900'}
          dark:bg-white ease-in-out duration-300 relative inline-flex
          items-center h-6 rounded-full w-11`}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled
            ? 'translate-x-6 dark:bg-green-500'
            : 'translate-x-1 dark:bg-green-900'
        }
            ease-in-out transform duration-300
            inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
}
