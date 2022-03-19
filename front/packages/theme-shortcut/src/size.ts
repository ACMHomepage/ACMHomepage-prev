import { merge, isArray, isObject } from 'lodash';
import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type HeightConfig = {
  _?: PseudoClassConfig;
  min?: PseudoClassConfig;
  max?: PseudoClassConfig;
} & PseudoClassConfig;

/**
 * A helper function to build height style.
 *
 * @param config - Value of the height or an object with keys below:
 * * `_`: for height.
 * * `min`: for min-height.
 * * `max`: for max-height.
 */
const height = (config: HeightConfig): ThemeUIStyleObject => {
  if (isArray(config) || !isObject(config)) {
    return { height: config };
  } else {
    const minHeight =
      'min' in config ? pseudoClass('minHeight', config.min) : undefined;
    const maxHeight =
      'max' in config ? pseudoClass('maxHeight', config.max) : undefined;

    return merge(pseudoClass('height', config), minHeight, maxHeight);
  }
};

type WidthConfig = {
  _?: PseudoClassConfig;
  min?: PseudoClassConfig;
  max?: PseudoClassConfig;
} & PseudoClassConfig;

/**
 * A helper function to build width style.
 *
 * @param config - Value of the width or an object with keys below:
 * * `_`: for width.
 * * `min`: for min-width.
 * * `max`: for max-width.
 */
const width = (config: WidthConfig): ThemeUIStyleObject => {
  if (isArray(config) || !isObject(config)) {
    return { width: config };
  } else {
    const minWidth =
      'min' in config ? pseudoClass('minWidth', config.min) : undefined;
    const maxWidth =
      'max' in config ? pseudoClass('maxWidth', config.max) : undefined;

    return merge(pseudoClass('width', config), minWidth, maxWidth);
  }
};

interface SizeConfig {
  h?: HeightConfig;
  w?: WidthConfig;
}

/**
 * A helper function to build size style.
 *
 * @param config - Object with keys below:
 * * `h`: for height, min-height and max-height.
 * * `w`: for width, min-width and max-width.
 */
export default (config: SizeConfig): ThemeUIStyleObject => {
  const { h, w } = config;

  return merge(height(h ?? {}), width(w ?? {}));
};
