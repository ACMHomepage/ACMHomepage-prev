import { merge } from 'lodash';
import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type BgConfig = {
  col?: PseudoClassConfig;
};

/**
 * A helper function to build background style.
 *
 * @param config - Object with keys below:
 * * `col`: for background's color.
 */
export default (config: BgConfig): ThemeUIStyleObject => {
  return merge(pseudoClass('backgroundColor', config.col)) ?? {};
};
