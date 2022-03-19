import { merge } from 'lodash';
import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type OutlineConfig = {
  width?: PseudoClassConfig;
  col?: PseudoClassConfig;
  style?: PseudoClassConfig;
};

/**
 * A helper function to build outline style.
 *
 * @param config - Object with keys below:
 * * `width`: for outline's width.
 * * `col`: for outline's color.
 * * `style`: for outline's color.
 */
export default (config: OutlineConfig): ThemeUIStyleObject => {
  const { width, col, style } = config;

  return merge(
    pseudoClass('outlineWidth', width ?? {}),
    pseudoClass('outlineColor', col ?? {}),
    pseudoClass('outlineStyle', style ?? {}),
  );
};
