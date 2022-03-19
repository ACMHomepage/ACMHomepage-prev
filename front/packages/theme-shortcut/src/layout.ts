import { merge } from 'lodash';
import { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type LayoutConfig = {
  pos?: PseudoClassConfig;
  display?: PseudoClassConfig;
  r?: PseudoClassConfig;
  l?: PseudoClassConfig;
  t?: PseudoClassConfig;
  b?: PseudoClassConfig;
  z?: PseudoClassConfig;
  objectFit?: PseudoClassConfig;
  overflow?: PseudoClassConfig;
};

/**
 * A function to gen style object for layout.
 *
 * @param config - Object with keys below:
 * * `pos`: for position.
 * * `r`: for right.
 * * `l`: for left.
 * * `t`: for top.
 * * `b`: for bottom.
 * * `z`: for z-index.
 * * `objectFit`: for object fit.
 * * `overflow`: for overflow.
 * * `display`: for display.
 */
export default (config: LayoutConfig): ThemeUIStyleObject => {
  const { pos, r, l, t, b, z, objectFit, overflow, display } = config;

  return merge(
    pseudoClass('position', pos),
    pseudoClass('right', r),
    pseudoClass('left', l),
    pseudoClass('bottom', b),
    pseudoClass('top', t),
    pseudoClass('objectFit', objectFit),
    pseudoClass('zIndex', z),
    pseudoClass('overflow', overflow),
    pseudoClass('display', display),
  );
};
