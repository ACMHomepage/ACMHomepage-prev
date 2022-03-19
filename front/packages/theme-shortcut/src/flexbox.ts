import { merge } from 'lodash';
import { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

type AlignConfig = {
  items?: PseudoClassConfig;
  self?: PseudoClassConfig;
  content?: PseudoClassConfig;
};

/**
 * A function to gen style object for alignment in flexbox.
 *
 * @param config - A object with keys:
 * * `items`: for aligning items.
 * * `self`: for aligning self.
 * * `content`: for aligning content.
 */
const align = (config: AlignConfig): ThemeUIStyleObject => {
  return merge(
    pseudoClass('alignItems', config.items),
    pseudoClass('alignSelf', config.self),
    pseudoClass('alignContent', config.content),
  );
};

type PlaceConfig = {
  items?: PseudoClassConfig;
  self?: PseudoClassConfig;
  content?: PseudoClassConfig;
};

/**
 * A function to gen style object for placement in flexbox.
 *
 * @param config - Object with keys below:
 * * `items`: for placing items.
 * * `self`: for placing self.
 * * `content`: for placing content.
 */
const place = (config: PlaceConfig): ThemeUIStyleObject => {
  return merge(
    pseudoClass('placeItems', config.items),
    pseudoClass('placeSelf', config.self),
    pseudoClass('placeContent', config.content),
  );
};

type FlexboxConfig = {
  align?: AlignConfig;
  place?: PlaceConfig;
  dir?: PseudoClassConfig;
  flex?: PseudoClassConfig;
  gap?: PseudoClassConfig;
};

/**
 * A helper function to build flexbox style.
 *
 * @param config - Object with keys below:
 * * `align`: for aligning items or content in flexbox,
 * * `place`: for placing items or content in flexbox,
 * * `dir`: for flexbox's direction,
 * * `flex`: for flex's value,
 * * `gap`: for gap in flexbox,
 */
export default (config: FlexboxConfig): ThemeUIStyleObject => {
  const { align: alignConf, place: placeConf, dir, flex, gap } = config;

  return merge(
    align(alignConf ?? {}),
    place(placeConf ?? {}),
    pseudoClass('flexDirection', dir),
    pseudoClass('flex', flex),
    pseudoClass('gap', gap),
  );
};
