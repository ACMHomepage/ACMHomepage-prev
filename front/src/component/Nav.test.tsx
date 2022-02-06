import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { isNull } from 'lodash';

import store from '../store/store';

import Nav from './Nav';

test('Nav all', async () => {
  // This will only build one child like `<nav>...</nav>`. And is well set not
  // dark as default.
  expect(localStorage.getItem('isDark')).toBe('false');
  const { getByText } = render(
    <Provider store={store}>
      <Nav />
    </Provider>,
  );

  // There will have a logo. And it is the first child of its parent.
  const logo = getByText('ACM Homepage');
  expect(logo.nodeName).toBe('SPAN');

  // Test the nav.
  let nav = logo.parentNode;
  expect(isNull(nav)).toBeFalsy();
  if(isNull(nav)) throw new Error('nav should not be null');
  expect(nav.nodeName).toBe('NAV');
  expect(nav.children.length).toBe(3);
  expect(nav.children[0]).toBe(logo);

  // Split the dark mode.
  const [_, darkMode, _menu] = nav.children;
  const [_darkModelLabel, darkModeToggle] = darkMode.children;

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

test('Two toggle, make sure they works well', async () => {
  // Render it.
  expect(localStorage.getItem('isDark')).toBe('false');
  const { getAllByLabelText, getByText } = render(
    <Provider store={store}>
      <Nav />
    </Provider>,
  );

  // Open menu to get the toggle in menu.
  const menu = getByText('Menu');
  fireEvent.click(menu);

  // Whatever toggle we use, we still can change the dark mode.
  const toggles = getAllByLabelText('Dark Mode');
  expect(toggles.length >= 2).toBe(true);

  let darkMode = true;
  for (let i = 0; i < 100; i++) {
    const index = Math.floor(Math.random() * toggles.length);
    expect(toggles[index].nodeName).toBe('BUTTON');

    fireEvent.click(toggles[index]);
    await new Promise(process.nextTick);
    expect(document.documentElement.classList.contains('dark')).toBe(darkMode);

    darkMode = !darkMode;
  }
});
