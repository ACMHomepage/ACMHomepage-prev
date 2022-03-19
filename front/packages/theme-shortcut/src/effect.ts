import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type EffectConfig = {
  opacity?: PseudoClassConfig;
};

/**
 * A helper function to build effect style.
 *
 * @param config - Object with keys below:
 * * `opacity`: for opacity.
 */
export default (config: EffectConfig): ThemeUIStyleObject => {
  const { opacity } = config;

  return pseudoClass('opacity', opacity);
};
