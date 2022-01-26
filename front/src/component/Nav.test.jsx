import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Nav from './Nav.jsx';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  localStorage.clear();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Nav all', () => {
  // This will only build one child like `<nav>...</nav>`. And is well set not
  // dark as default.
  expect(localStorage.isDark).toBe(undefined);
  act(() => {
    render(<Nav />, container);
  });
  expect(container.children.length).toBe(1);
  expect(localStorage.isDark).toBe('false');

  const content = container.children[0];
  expect(content.nodeName).toBe('NAV');

  // The nav will have three children: log, darkModeLabel, darkModelToggle.
  expect(content.children.length).toBe(3);

  const [logo, darkMode, Menu] = content.children;
  expect(logo.nodeName).toBe('SPAN');
  expect(logo.innerHTML).toBe('ACM Homepage');
  expect(darkMode.nodeName).toBe('DIV');
  const [darkModeLabel, darkModelToggle] = darkMode.children;

  // `darkModelToggle` can change the root `<html>...</html>` to have or not
  // have class `dark`.
  expect(darkModelToggle.nodeName).toBe('BUTTON');
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.isDark).toBe('false');
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(localStorage.isDark).toBe('true');
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.isDark).toBe('false');
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(localStorage.isDark).toBe('true');
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.isDark).toBe('false');

  // And There have a button `Menu`
  expect(Menu.nodeName).toBe('DIV');
});
