export {}; // Just make it as a module.

test('Remember the dark mode', async () => {
  // Normal mode at first.
  expect(localStorage.getItem('isDark')).toBe(null);
  expect(document.documentElement.classList.contains('dark')).toBe(false);

  // True on just in localStorage.
  localStorage.setItem('isDark', 'true');
  expect(localStorage.getItem('isDark')).toBe('true');
  expect(document.documentElement.classList.contains('dark')).toBe(false);

  // Load the store.js. it will init by localStorage.
  const store = await import('./store');

  // And we will find that 'dark' in the `documentElement`'s classList.
  expect(localStorage.getItem('isDark')).toBe('true');
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});
