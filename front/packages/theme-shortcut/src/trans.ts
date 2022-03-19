import { merge } from 'lodash';
import { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type TransConfig = {
  transform?: PseudoClassConfig;
  transition?: PseudoClassConfig;
};

/**
 * A function to gen style object for transition ans transform.
 *
 * @param config - Object with keys below:
 * * `transform`: for transform.
 * * `transition`: for transition property.
 */
export default (config: TransConfig): ThemeUIStyleObject => {
  const { transform, transition } = config;

  return merge(
    pseudoClass('transform', transform),
    pseudoClass('transitionProperty', transition),
  );
};
