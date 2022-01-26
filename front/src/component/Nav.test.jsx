import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import store from '../store/store.js';

import Nav from './Nav.jsx';

test('Nav all', async () => {
  // This will only build one child like `<nav>...</nav>`. And is well set not
  // dark as default.
  expect(localStorage.getItem('isDark')).toBe('false');
  const { getByText, container } = render(
    <Provider store={store}>
      <Nav />
    </Provider>
  );

  // There will have a logo. And it is the first child of its parent.
  const logo = getByText('ACM Homepage');
  expect(logo.nodeName).toBe('SPAN');

  // Test the nav.
  const nav = logo.parentNode;
  expect(nav.nodeName).toBe('NAV');
  expect(nav.children.length).toBe(3);
  expect(nav.children[0]).toBe(logo);

  // Split the dark mode.
  const [_, darkMode, menu] = nav.children;
  const [darkModelLabel, darkModeToggle] = darkMode.children;

  // `darkModeToggle` can change the root `<html>...</html>` to have or not
  // have class `dark`.
  expect(darkModeToggle.nodeName).toBe('BUTTON');
  expect(document.documentElement.classList.contains('dark')).toBe(false);

  fireEvent.click(darkModeToggle);
  await new Promise(process.nextTick);
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(localStorage.getItem('isDark')).toBe('true');

  fireEvent.click(darkModeToggle);
  await new Promise(process.nextTick);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.getItem('isDark')).toBe('false');

  fireEvent.click(darkModeToggle);
  await new Promise(process.nextTick);
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(localStorage.isDark).toBe('true');

  fireEvent.click(darkModeToggle);
  await new Promise(process.nextTick);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.isDark).toBe('false');
});
