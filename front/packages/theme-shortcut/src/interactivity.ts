import { merge } from 'lodash';
import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type InteractivityConfig = {
  cursor?: PseudoClassConfig;
  resize?: PseudoClassConfig;
};

/**
 * A helper function to build interactivity style.
 *
 * @param config - Object with keys below:
 * * `cursor`: for cursor.
 * * `resize`: for resize.
 */
export default (config: InteractivityConfig): ThemeUIStyleObject => {
  const { cursor, resize } = config;

  return merge(pseudoClass('cursor', cursor), pseudoClass('resize', resize));
};
