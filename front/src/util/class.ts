import { colors, breakPointMap } from '../config.tsx';

export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type Size = number | string;

export interface BreakPointMap {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Get the size by argmnet `size`:
// e.g.:
//   size(1) => '0.25rem'.
//   size('full') => '100%'.
//   size('big') => '999999px';
//   size('1/2') => '50%'.
// if the argument is not valid, it will return `0px`.
export function size(size: Size): string {
  if (typeof size === 'number') {
    return `${size * 0.25}rem`;
  } else if (size === 'full') {
    return '100%';
  } else if (size === 'big') {
    return '999999px';
  } else {
    let [first_str, second_str] = size.split('/');
    let first = parseInt(first_str);
    let second = parseInt(second_str);
    let value = first / second * 100;
    return isNaN(value) ? '0px' : `${value}%`;
  }
}

// Get the color by `config.j`.
function getColor(color: string, depth?: number): string {
  if (typeof depth === 'undefined') {
    return colors[color].DEFAULT;
  } else {
    return colors[color][depth];
  }
}

export const color = getColor;

// Set the breakPoint by device's width.
export function brkPt(breakPoint: BreakPoint, value: string) {
  return `@media(min-width:${breakPointMap[breakPoint]}){${value}}`;
}

// // Set the dark mode.
export function dark(arg: string): string {
  return `.dark &{${arg}}`;
}

// Set the shadow.
type ShadowSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';
export function shadow(size?: ShadowSize): string {
  if (typeof size === 'undefined') {
    return '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
  } else if (size === 'sm') {
    return '0 1px 2px 0 rgb(0 0 0 / 0.05)';
  } else if (size === 'md') {
    return '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
  } else if (size === 'lg') {
    return '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
  } else if (size === 'xl') {
    return '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
  } else if (size === '2xl') {
    return '0 25px 50px -12px rgb(0 0 0 / 0.25)';
  } else if (size === 'inner') {
    return 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)';
  } else {
    return '0 0 #0000';
  }
}
