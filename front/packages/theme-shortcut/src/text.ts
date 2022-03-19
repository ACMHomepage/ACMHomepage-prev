import { merge } from 'lodash';
import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type TextConfig = {
  col?: PseudoClassConfig;
  align?: PseudoClassConfig;
};

/**
 * A helper function to build text style.
 *
 * @param config - Object with keys below:
 * * `col`: for text color.
 * * `align`: for text align.
 */
export default (config: TextConfig): ThemeUIStyleObject => {
  const { col, align } = config;

  return merge(pseudoClass('color', col), pseudoClass('textAlign', align));
};
