import { merge } from 'lodash';
import { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type FontConfig = {
  size?: PseudoClassConfig;
  weight?: PseudoClassConfig;
};

/**
 * A helper function to build font style.
 *
 * @param config - Object with keys below:
 * * `size`: for font's size,
 * * `weight`: for font's weight,
 */
export default (config: FontConfig): ThemeUIStyleObject => {
  const { size, weight } = config;

  return merge(
    pseudoClass('fontSize', size),
    pseudoClass('fontWeight', weight),
  );
};
