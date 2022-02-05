import merge from 'lodash/merge';

// buildColorsTheme will make the colors looks like:
// ``` js
// {
//   green: { DEFAULT: '#aaa', 300: '#bbb', 500: '#ccc' }
// }
// ```
// To be like:
// ``` js
// {
//   green: '#aaa',
//   'green-300': '#bbb',
//   'green-500': '#ccc',
// }
// ```
interface Colors {
  [key: string]: { DEFAULT: string; [key: number]: string };
}

function buildColorsTheme(colors: Colors): { [key: string]: string } {
  let result: { [key: string]: string } = {};
  for (let key in colors) {
    result[key] = colors[key].DEFAULT;
    for (let subkey in colors[key]) {
      if (subkey === 'DEFAULT') continue;
      result[`${key}-${subkey}`] = colors[key][subkey];
    }
  }
  return result;
}

export const _buildColorsTheme = buildColorsTheme;

// Set the breakpoints.
const breakpoints: any = ['640px', '780px', '1024px', '1280px', '1536px'];
breakpoints.sm = '640px';
breakpoints.md = '780px';
breakpoints.lg = '1024px';
breakpoints.xl = '1280px';
breakpoints.xxl = '1536px';

// Set the colors.
let colors = buildColorsTheme({
  green: {
    DEFAULT: '#9EC5AC',
    100: '#DAE6DE',
    200: '#D4E6DA',
    300: '#D7EFE0',
    400: '#B7D8C3',
    500: '#9EC5AC',
    600: '#78A288',
    700: '#5A8068',
    800: '#446953',
    900: '#32533F',
  },
  gray: {
    DEFAULT: '#909799',
    100: '#F9FEFF',
    200: '#DDE2E3',
    300: '#C4CBCC',
    400: '#A9B1B3',
    500: '#909799',
    600: '#747B7D',
    700: '#5D6566',
    800: '#43494B',
    900: '#2E3233',
  },
});

merge(colors, {
  modes: {
    light: {
      primary: colors['green-900'],
      primaryBg: 'white',
      secondary: colors['green-700'],
      secondaryBg: colors['green-200'],
    },
    dark: {
      primary: 'white',
      primaryBg: colors['green-900'],
      secondary: colors['green-200'],
      secondaryBg: colors['green-700'],
    },
  },
});

// The default theme.
export default {
  colors,
  breakpoints,
};
