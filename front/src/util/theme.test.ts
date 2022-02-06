import { _buildColorsTheme as buildColorsTheme } from './theme';

test('Test buildColorsTheme works well', () => {
  const colors = {
    green: { DEFAULT: '#aaa', 300: '#bbb', 500: '#ccc' },
    alsoGreen: { DEFAULT: '#aaa', 300: '#bbb', 500: '#ccc' },
  };

  expect(buildColorsTheme(colors)).toStrictEqual({
    green: '#aaa',
    'green-300': '#bbb',
    'green-500': '#ccc',
    alsoGreen: '#aaa',
    'alsoGreen-300': '#bbb',
    'alsoGreen-500': '#ccc',
  });
});
