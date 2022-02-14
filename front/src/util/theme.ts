import type {
  Theme,
  ColorModesScale,
  ColorMode,
  ThemeUICSSObject,
  ThemeUIStyleObject,
} from 'theme-ui';
import fill from 'lodash/fill';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

/******************************************************************************
 * Set the colors.
 *****************************************************************************/
type Color = ColorModesScale[string];
type ColorStyle = ThemeUICSSObject['color'];

interface Colors extends ColorModesScale {
  readonly green: Color;
  readonly gray: Color;
  modes: { dark: ColorMode };
}

const colors: Colors = {
  green: [
    '#F5FBF7', // 0
    '#E8F4EC', // 1
    '#D2E9DB', // 2
    '#B7D8C3', // 3
    '#9EC5AC', // 4
    '#78A288', // 5
    '#5A8068', // 6
    '#446953', // 7
    '#32533F', // 8
    '#244230', // 9
  ],
  gray: [
    '#F9FEFF', // 0
    '#DDE2E3', // 1
    '#C4CBCC', // 2
    '#A9B1B3', // 3
    '#909799', // 4
    '#747B7D', // 5
    '#5D6566', // 6
    '#43494B', // 7
    '#2D3233', // 8
    '#2E3233', // 9
  ],
  modes: {
    dark: {},
  },
};

colors.text = get(colors, 'green.9');
colors.modes.dark.text = get(colors, 'green.2');

colors.background = get(colors, 'green.0');
colors.modes.dark.background = get(colors, 'green.9');

colors.secondaryBackground = get(colors, 'green.2');
colors.modes.dark.secondaryBackground = get(colors, 'green.7');

// Fuck, now those are useless
colors.primary = 'white';
colors.modes.dark.primary = 'white';

colors.secondary = 'white';
colors.modes.dark.secondary = 'white';

interface SetColorConfig {
  setColorToBorderColor: boolean;
}

/**
 * setColor.
 *
 * @param color The text color and border color.
 * @param bg The background's color.
 * @param config Config:
 * - `setColorToBorderColor`: `true`(defalut) | `false`. Set param `color` to
 *   border's color or not.
 */
export const setColor = (
  color: ColorStyle,
  bg: ColorStyle,
  config?: SetColorConfig,
) => {
  if (isUndefined(config)) {
    config = {
      setColorToBorderColor: true,
    };
  }

  return {
    color,
    bg,
    borderColor: config.setColorToBorderColor ? color : undefined,
  };
};

/******************************************************************************
 * Set the break points.
 *****************************************************************************/
const __breakpointNameWithoutInitArray = ['sm', 'md', 'lg', 'xl'] as const;
if ('_' in __breakpointNameWithoutInitArray) {
  throw new Error(
    `Be sure that '_' cannot in the \`__breakpointNameWithoutInitArray\``,
  );
}

export type BreakpointNameWithoutInit =
  typeof __breakpointNameWithoutInitArray[number];
export type BreakpointName = BreakpointNameWithoutInit | '_';
export type BreakpointMapWithoutInit = {
  [size in BreakpointNameWithoutInit]: number;
};
export type BreakpointMap = {
  [size in BreakpointName]: number;
};

// Make breakpoints array and its name map(to breakpoints array's index).
// e.g. makeBreakPoints([['640px', 'sm'], ['780px', 'md']]) === [['640px',
// '780px'], {'sm': 0, 'md': 1}].
const makeBreakPoints = (
  breakpointsAndNames: Array<[string, BreakpointNameWithoutInit]>,
): [Array<string>, BreakpointMapWithoutInit] => {
  if (breakpointsAndNames.length !== __breakpointNameWithoutInitArray.length) {
    throw new Error(
      `Be sure that those names ${__breakpointNameWithoutInitArray},` +
        "are all in the argument `breakpointsAndNames`'s breakpoints' names",
    );
  }

  let result: [Array<string>, { [size: string]: number }] = [[], {}];
  let breakpointNames = new Set();
  for (let i = 0; i < breakpointsAndNames.length; i++) {
    let [size, name] = breakpointsAndNames[i];

    // make sure breakpoint name is unique.
    if (name in breakpointNames) {
      throw new Error("Be sure that breakpoint's name is unique.");
    }
    breakpointNames.add(name);

    result[0].push(size);
    result[1][name] = i;
  }
  return [result[0], result[1] as BreakpointMapWithoutInit];
};

const [breakpoints, breakpointNames] = makeBreakPoints([
  ['640px', 'sm'], // breakpoint 0
  ['780px', 'md'], // breakpoint 1
  ['1024px', 'lg'], // breakpoint 2
  ['1536px', 'xl'], // breakpoint 3
]);

// Make responsive value. (alias: mRV).
// e.g. If breakpointNames(should use `makeBreakPoints` to make) is {'sm': 0,
// 'md': 1, 'lg': 2, 'xl': 3}, then mRV<string>({_: '10px', 'md': '20px'}) ===
// ['10px', null, '20px', null, null].
export const makeResponsiveValue = <T>(
  argument: Partial<{ [size in BreakpointName]: T }>,
): (T | null)[] => {
  let result: (T | null)[] = fill(Array(breakpoints.length + 1), null);
  for (const s in argument) {
    const size = s as BreakpointName;
    const value = argument[size];
    if (isUndefined(value)) continue;
    if (size === '_') {
      result[0] = value;
      continue;
    }
    result[breakpointNames[size] + 1] = value;
  }
  return result;
};

/** Make responsive value. (alias: mRV). */
export const mRV = makeResponsiveValue;

/******************************************************************************
 * Set the radius size for border.
 *****************************************************************************/
const radii = {
  normal: '0.25rem',
  inf: '999999px',
};

interface SetBorderConfig {
  width?: ThemeUICSSObject['borderWidth'];
  radius?: ThemeUICSSObject['borderRadius'];
  style?: ThemeUICSSObject['borderStyle'];
}

/**
 * config:
 * - width: `<WIDTH>` | `'1px'`(defalut).
 * - radius: `<RADII>` | `'normal'`(defalut).
 * - style: `<BORDER-STYLE>` | `'solid'`(default).
 */
export const setBorder = (config?: SetBorderConfig) => {
  if (isUndefined(config)) config = {};
  if (isUndefined(config.width)) config.width = '1px';
  if (isUndefined(config.radius)) config.radius = 'normal';
  if (isUndefined(config.style)) config.style = 'solid';
  return {
    borderWidth: config.width,
    borderRadius: config.radius,
    borderStyle: config.style,
  };
};

/******************************************************************************
 * Set the weights, size for font.
 *****************************************************************************/
const fontWeights: Theme['fontWeights'] = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

fontWeights.h1 = fontWeights.extrabold;
fontWeights.h2 = fontWeights.bold;
fontWeights.h3 = fontWeights.semibold;
fontWeights.h4 = fontWeights.semibold;
fontWeights.h5 = fontWeights.medium;
fontWeights.h6 = fontWeights.medium;
fontWeights.body = fontWeights.normal;

const fontSizes: Theme['fontSizes'] = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

type FontSizeName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const setFontSize = (name: FontSizeName): ThemeUICSSObject['fontSize'] => {
  switch (name) {
    case 'h1': return mRV({ _: '5xl', md: '6xl', lg: '7xl' });
    case 'h2': return mRV({ _: '4xl', md: '5xl', lg: '6xl' });
    case 'h3': return mRV({ _: '3xl', md: '4xl', lg: '5xl' });
    case 'h4': return mRV({ _: '2xl', md: '3xl', lg: '4xl' });
    case 'h5': return mRV({ _: 'xl', md: '2xl', lg: '3xl' });
    case 'h6': return mRV({ _: 'lg', md: 'xl', lg: '2xl' });
  }
}


/******************************************************************************
 * Set the flexbox.
 *****************************************************************************/
interface SetFlexConfig {
  center?: boolean;
  gap?: ThemeUICSSObject['gap'];
}

/**
 * setFlex.
 *
 * @param config Config the flexbox's style.
 * - `center`: `false`(default) | `true`. Set the content is put at the center
 *   or not.
 * - `gap`: `<LENGTH>` | `undefined`(default).
 */
export const setFlex = ({ center = false, gap }: SetFlexConfig) => {
  return {
    display: 'flex',
    alignItems: center ? 'center' : undefined,
    placeContent: center ? 'center' : undefined,
    gap,
  };
};

/******************************************************************************
 * Default theme.
 *****************************************************************************/
export default {
  config: {
    initialColorModeName: 'light',
  },
  colors,
  breakpoints,
  radii,
  fontWeights,
  fontSizes,
} as Theme;
