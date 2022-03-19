import { merge, isArray, isString } from 'lodash';
import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type BorderRadiusConfig = {
  tl?: PseudoClassConfig;
  tr?: PseudoClassConfig;
  bl?: PseudoClassConfig;
  br?: PseudoClassConfig;
} & PseudoClassConfig;

/**
 * A helper function to build border radius style.
 *
 * @param config - Value of border radius or object with keys below:
 * * `_`: for border radius.
 * * `tl`: for border top-left radius.
 * * `bl`: for border bottom-left radius.
 * * `tr`: for border top-right radius.
 * * `br`: for border bottom-right radius.
 */
const borderRadius = (config: BorderRadiusConfig): ThemeUIStyleObject => {
  if (isArray(config) || isString(config)) {
    return { borderRadius: config };
  } else {
    const borderTopLeftRadius =
      'tl' in config
        ? pseudoClass('borderTopLeftRadius', config.tl)
        : undefined;
    const borderTopRightRadius =
      'tr' in config
        ? pseudoClass('borderTopRightRadius', config.tr)
        : undefined;
    const borderBottomLeftRadius =
      'bl' in config
        ? pseudoClass('borderBottomLeftRadius', config.bl)
        : undefined;
    const borderBottomRightRadius =
      'br' in config
        ? pseudoClass('borderBottomRightRadius', config.br)
        : undefined;

    return merge(
      pseudoClass('borderRadius', config),
      borderTopRightRadius,
      borderTopLeftRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    );
  }
};

type BorderConfig = {
  width?: PseudoClassConfig;
  col?: PseudoClassConfig;
  radius?: BorderRadiusConfig;
};

/**
 * A helper function to build border style.
 *
 * @param config - Object with keys below:
 * * `width`: for border's width.
 * * `col`: for border's color.
 * * `radius`: for border's radius.
 */
export default (config: BorderConfig): ThemeUIStyleObject => {
  const { width, col, radius } = config;

  return merge(
    pseudoClass('borderWidth', width ?? {}),
    pseudoClass('borderColor', col ?? {}),
    borderRadius(radius ?? {}),
  );
};
