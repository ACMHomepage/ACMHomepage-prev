import type { ThemeUIStyleObject } from 'theme-ui';
import {
  isNumber,
  isArray,
  isString,
  isUndefined,
  isNull,
  merge,
} from 'lodash';

type PseudoClassConfigAtom =
  | string
  | number
  | null
  | (string | number | null)[];

export type PseudoClassConfig =
  | {
      _?: PseudoClassConfig;
      hover?: PseudoClassConfigAtom;
      hv?: PseudoClassConfigAtom;
      focus?: PseudoClassConfigAtom;
      fc?: PseudoClassConfigAtom;
    }
  | PseudoClassConfigAtom;

/**
 * A function that deal with pseudo class in style class.
 *
 * @param name - The style object's name.
 * @param config - The config for name.
 * * If config type is `undefined`, it will just return a empty object.
 * * If config type is not `object`, it will just return a `{ [name]:
 *   config }`.
 * * If config type is `object`, the key `_` means default style, and the
 *   keys `hover` and `focus` means the style when element is hovered or
 *   focused.
 */
const pseudoClass = (
  name: string,
  config?: PseudoClassConfig,
): ThemeUIStyleObject => {
  if (isNull(config) || isUndefined(config)) {
    return {};
  }
  if (isArray(config) || isString(config) || isNumber(config)) {
    return { [name]: config };
  }

  const { _, hover, hv, focus, fc } = config;

  return merge(
    pseudoClass(name, _),
    buildPseudoClassAtom(':hover', name, hover),
    buildPseudoClassAtom(':hover', name, hv),
    buildPseudoClassAtom(':focus', name, focus),
    buildPseudoClassAtom(':focus', name, fc),
  );
};

export const pseudoClassArr = [':hover', ':focus'];

const buildPseudoClassAtom = (
  pseudoClassName: string,
  attrName: string,
  value?: PseudoClassConfigAtom,
) => {
  return value ? { [pseudoClassName]: { [attrName]: value } } : {};
};

export default pseudoClass;
