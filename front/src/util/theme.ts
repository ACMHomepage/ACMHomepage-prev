import type {
  Theme,
  ColorModesScale,
  ColorMode,
  ThemeUICSSObject,
  ThemeUIStyleObject,
} from 'theme-ui';
import { fill, isUndefined } from 'lodash';

/******************************************************************************
 * Basic part
 *****************************************************************************/

interface BuildSetFunctionHover<T> {
  hover?: T;
}

const buildSetFunction =
  <T>(fun: (config: T) => ThemeUIStyleObject) =>
  (config?: T & BuildSetFunctionHover<T>) => {
    const { hover, ...pureConfig } = config ?? {};
    return {
      ...fun(pureConfig as T),
      ...(hover
        ? {
            ':hover': fun(hover),
          }
        : null),
    };
  };

/******************************************************************************
 * Set the colors.
 *****************************************************************************/
interface Colors extends ColorModesScale {
  modes: { dark: ColorMode };
}

/**
 * Make sure the `value` is in the range of [-256, 255]. If the `value` < 0, the
 * value will set to `(256 + value)` to make sure `value` >= 0.
 *
 * @param value The value to check.
 */
const checkValue = (value: number): number => {
  if (value < -256 || value >= 256) {
    throw new Error('the value is out of range.');
  }
  return ((value % 256) + 256) % 256;
};

type colorHSLFunction = (value: number) => number;

/**
 * `color` - Build the color function to get the HSL color string.
 * @param H - a function to build the hue of HSL. Make sure its return value
 *     range is [0, 255].
 * @param S - a function to build the saturation of HSL. Make sure its return
 *     value range is [0, 100].
 * @param L - a function to build the brightness of HSL. Make sure its return
 *     value range is [0, 100].
 * @returns a function to given the value of range [-256, 255], and alpha
 * (defalut to 1), and build the HSL color.
 */
const color =
  (H: colorHSLFunction, S: colorHSLFunction, L: colorHSLFunction) =>
  (value: number, alpha?: number): string => {
    value = checkValue(value);
    return `hsla(${H(value)},${S(value)}%,${L(value)}%,${alpha ?? 1})`;
  };

/**
 * Return the green HSL string by the `value` (>= -256 & < 256). If the `value`
 * < 0, the value will set to `(256 + value)`.
 *
 * If the value is not in the range, it will raise an Error!
 *
 * @param value - The value to build the green HSL color string.
 * @param alpha - Default to set to 1.
 */
const green = color(
  (_v) => 145,
  (v) => 15 + Math.sin((v / 256) * Math.PI) * 20,
  (v) => 97 - (v / 256) * 78,
);

/**
 * Return the blue HSL string by the `value` (>= -256 & < 256). If the `value`
 * < 0, the value will set to `(256 + value)`.
 *
 * If the value is not in the range, it will raise an Error!
 *
 * @param value The value to build the green HSL color string.
 * @param alpha - Default to set to 1.
 */
const blue = color(
  (_v) => 200,
  (v) => 25 + (v / 256) * 20 + Math.sin((v / 256) * Math.PI) * 20,
  (v) => 90 - (v / 256) * 68,
);

const colors: Colors = {
  modes: {
    dark: {},
  },
};

type SetThemeColorArgColors = { _: string; dark: string };

/**
 * setThemeColor set the theme color.
 *
 * @param name - The name to use.
 * @param argColors - A object. It have two key now: `_` and `dark`, the first
 *     one is default color, and the `dark` is for dark mode.
 */
const setThemeColor = (name: string, argColors: SetThemeColorArgColors) => {
  for (let key in argColors) {
    if (key === '_') {
      colors[name] = argColors._;
    } else if (key === 'dark') {
      colors.modes.dark[name] = argColors.dark;
    }
  }
};

for (let i = 0; i < 10; i++) {
  // set `text-${range}`.
  setThemeColor(`fg-${i}`, {
    _: green(255 - 10 * i),
    dark: green(50 + 10 * i),
  });

  // set `bg-${range}`.
  setThemeColor(`bg-${i}`, { _: green(10 * i), dark: green(255 - 10 * i) });
}

setThemeColor('link', { _: blue(255 - 50), dark: blue(80) });
setThemeColor('outline', { _: green(205, 0.25), dark: green(50, 0.25) });
setThemeColor('border', { _: green(10), dark: green(245) });

setThemeColor('secondaryBackground', { _: green(20), dark: green(235) });
setThemeColor('text', { _: green(245), dark: green(10) });
setThemeColor('background', { _: green(0), dark: green(255) });

setThemeColor('primary', { _: 'white', dark: 'white' });
setThemeColor('secondary', { _: 'white', dark: 'white' });

interface SetColorConfig {
  color?: string;
  bg?: string;
}

/**
 * setColor.
 *
 * @param config - It holds:
 * - `color`: The text color.
 * - `bg`: The background's color.
 * - others: see `buildSetFunction`.
 *
 * @see buildSetFunction
 */
export const setColor = buildSetFunction<SetColorConfig>((config) => {
  const { color = 'fg-0', bg = 'bg-0' } = config;
  return { color, bg };
});

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
  normal: '0.5rem',
  inf: '999999px',
};

interface SetBorderConfig {
  width?: ThemeUICSSObject['borderWidth'];
  radius?: ThemeUICSSObject['borderRadius'];
  style?: ThemeUICSSObject['borderStyle'];
  color?: ThemeUICSSObject['borderColor'];
}

/**
 * config:
 * - width: `<WIDTH>` | `'1px'`(defalut).
 * - radius: `<RADII>` | `'normal'`(defalut).
 * - style: `<BORDER-STYLE>` | `'solid'`(default).
 * - color: `<COLOR>` | undefined.
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
    borderColor: config.color,
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
fontWeights.link = fontWeights.semibold;

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

export const setFontSize = (
  name: FontSizeName,
): ThemeUICSSObject['fontSize'] => {
  switch (name) {
    case 'h1':
      return mRV({ _: '5xl', md: '6xl', lg: '7xl' });
    case 'h2':
      return mRV({ _: '4xl', md: '5xl', lg: '6xl' });
    case 'h3':
      return mRV({ _: '3xl', md: '4xl', lg: '5xl' });
    case 'h4':
      return mRV({ _: '2xl', md: '3xl', lg: '4xl' });
    case 'h5':
      return mRV({ _: 'xl', md: '2xl', lg: '3xl' });
    case 'h6':
      return mRV({ _: 'lg', md: 'xl', lg: '2xl' });
  }
};

/******************************************************************************
 * Set the flexbox.
 *****************************************************************************/
interface SetFlexConfig {
  center?: boolean;
  gap?: ThemeUICSSObject['gap'];
  direction?: ThemeUICSSObject['flexDirection'];
}

/**
 * setFlex.
 *
 * @param config Config the flexbox's style.
 * - `center`: `false`(default) | `true`. Set the content is put at the center
 *   or not.
 * - `gap`: `<LENGTH>` | `undefined`(default).
 * - `direction`: `'row'` | `'column'` | `undefined`(default).
 */
export const setFlex = (props?: SetFlexConfig) => {
  const { center = false, gap, direction } = props ?? {};

  return {
    display: 'flex',
    alignItems: center ? 'center' : undefined,
    placeContent: center ? 'center' : undefined,
    gap,
    flexDirection: direction,
  };
};

/******************************************************************************
 * Set the outline.
 *****************************************************************************/
interface OutlineConfig {
  color?: ThemeUICSSObject['outlineColor'];
  width?: ThemeUICSSObject['outlineWidth'];
  style?: ThemeUICSSObject['outlineStyle'];
}

/**
 * set the outline of it.
 *
 * @param props - It holds:
 * - color: `<COLOR>` | `'outline'`(default).
 * - width: `<WIDTH>` | `'0.25rem'`(default).
 * - style: `<STYLE>` | `'solid'`(default).
 */
export const setOutline = (props?: OutlineConfig) => {
  const { color = 'outline', width = '0.25rem', style = 'solid' } = props ?? {};

  return {
    outlineColor: color,
    outlineWidth: width,
    outlineStyle: style,
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
