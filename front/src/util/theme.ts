import type { Theme, ColorMode, ColorModesScale, ColorMode } from 'theme-ui';
import fill from 'lodash/fill';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

/******************************************************************************
 * Set the colors.
 *****************************************************************************/
interface Colors extends ColorModesScale {
  readonly green: ColorMode[string];
  readonly gray: ColorMode[string];
  modes: { dark: ColorMode };
};

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
    "#244230", // 9
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

colors.primary = get(colors, 'green.8');
colors.modes.dark.primary = get(colors, 'green.2');

colors.primaryBg = get(colors, 'green.2');
colors.modes.dark.primaryBg = get(colors, 'green.6');

colors.secondary = get(colors, 'green.8')
colors.modes.dark.secondary = get(colors, 'green.1')

colors.secondaryBg = get(colors, 'green.1');
colors.modes.dark.secondaryBg = get(colors, 'green.7');

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
