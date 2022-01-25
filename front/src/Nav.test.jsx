import React from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

import Nav from './Nav.jsx';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('all', () => {
  act(() => {
    render(<Nav />, container);
  });
  expect(container.children.length).toBe(1);

  const content = container.children[0];
  expect(content.nodeName).toBe('NAV');

  expect(content.children.length).toBe(3);

  const [logo, darkModeLabel, darkModelToggle] = content.children;
  expect(logo.nodeName).toBe('SPAN');
  expect(logo.innerHTML).toBe('ACM Homepage');
  expect(darkModeLabel.innerHTML).toBe('Dark Mode');

  expect(darkModelToggle.nodeName).toBe('BUTTON');
  expect(document.documentElement.classList.contains("dark")).toBe(false);
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains("dark")).toBe(false);
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  act(() => darkModelToggle.click());
  expect(document.documentElement.classList.contains("dark")).toBe(false);
});
