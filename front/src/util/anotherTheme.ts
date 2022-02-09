import type { Theme, ColorMode, ColorModesScale, CSSProperties } from 'theme-ui';
import fill from 'lodash/fill';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

/******************************************************************************
 * Set the colors.
 *****************************************************************************/
const colors: ColorModesScale = {
  green: [
    '#FFFFFF', // 0
    '#E6F5EB', // 1
    '#B8E0C5', // 2
    '#86BF99', // 3
    '#629974', // 4
    '#41664E', // 5
    '#2D4033', // 6
    '#191F1B', // 7
    '#0A0A0A', // 8
    '#000000', // 9
  ],
  gray: [
    '#F9FEFF', // 0
    '#E9F3F5', // 1
    '#D0DEE0', // 2
    '#ACBCBF', // 3
    '#869699', // 4
    '#566366', // 5
    '#343E40', // 6
    '#181E1F', // 7
    '#080A0A', // 8
    '#000000', // 9
  ],
  modes: {
    dark: {},
  },
};

colors.text = get(colors, 'green[8]');
colors.background = get(colors, 'green[1]');
colors.primary = {
  __default: get(colors, 'green[6]') as CSSProperties['color'],
  darker: get(colors, 'green[7]') as CSSProperties['color'],
  lighter: get(colors, 'green[5]') as CSSProperties['color'],
};
(colors.modes?.dark as ColorMode).primary = {
  __default: get(colors, 'green[2]') as CSSProperties['color'],
  darker: get(colors, 'green[3]') as CSSProperties['color'],
  lighter: get(colors, 'green[1]') as CSSProperties['color'],
};

colors.primaryBg = {
  __default: get(colors, 'green[2]') as CSSProperties['color'],
  darker: get(colors, 'green[3]') as CSSProperties['color'],
  lighter: get(colors, 'green[1]') as CSSProperties['color'],
};
(colors.modes?.dark as ColorMode).primaryBg = {
  __default: get(colors, 'green[6]') as CSSProperties['color'],
  darker: get(colors, 'green[7]') as CSSProperties['color'],
  lighter: get(colors, 'green[5]') as CSSProperties['color'],
};
 
colors.secondary = {
  __default: get(colors, 'green[8]') as CSSProperties['color'],
  darker: get(colors, 'gray[9]') as CSSProperties['color'],
  lighter: get(colors, 'gray[7]') as CSSProperties['color'],
};
(colors.modes?.dark as ColorMode).secondary = {
  __default: get(colors, 'green[1]') as CSSProperties['color'],
  darker: get(colors, 'green[2]') as CSSProperties['color'],
  lighter: get(colors, 'green[0]') as CSSProperties['color'],
};

colors.secondaryBg = {
  __default: get(colors, 'green[1]') as CSSProperties['color'],
  darker: get(colors, 'green[2]') as CSSProperties['color'],
  lighter: get(colors, 'green[0]') as CSSProperties['color'],
};
(colors.modes?.dark as ColorMode).secondaryBg = {
  __default: get(colors, 'green[5]') as CSSProperties['color'],
  darker: get(colors, 'gray[6]') as CSSProperties['color'],
  lighter: get(colors, 'gray[4]') as CSSProperties['color'],
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

export const mRV = makeResponsiveValue;

/******************************************************************************
 * Set the size for radius.
 *****************************************************************************/
const radii = {
  inf: '999999px',
};

/******************************************************************************
 * Set the weights for font.
 *****************************************************************************/
const fontWeights = {
  body: 400,
  bold: 700,
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
} as Theme;
