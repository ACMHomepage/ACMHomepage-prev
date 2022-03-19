import { isNull, isArray, isObject, merge, isUndefined } from 'lodash';
import type { ThemeUIStyleObject } from 'theme-ui';

import pseudoClass, { pseudoClassArr } from './pseudoClass';
import type { PseudoClassConfig } from './pseudoClass';

const mergeAttr = (
  attrName: string,
  attrArr: string[],
  obj: { [key: string]: any },
  baseObj?: { [key: string]: any },
) => {
  // If `obj[attrArr[i]]` are same, then we need merge those into `obj[attrName]`.
  let mergeFlag = true;
  let shorthandFlag = true;

  for (let i = 1; i < attrArr.length; i++) {
    if (obj[attrArr[0]] !== obj[attrArr[i]]) {
      mergeFlag = false;
      break;
    }
  }

  for (let i = 0; i < attrArr.length; i++) {
    if (
      isUndefined(obj[attrArr[i]]) &&
      (isUndefined(baseObj) || isUndefined(baseObj[attrArr[i]]))
    ) {
      shorthandFlag = false;
      break;
    }
  }

  if (mergeFlag) {
    obj[attrName] = obj[attrArr[0]];
  } else if (shorthandFlag) {
    obj[attrName] = '';
    let isFirst = true;
    for (let i = 0; i < attrArr.length; i++) {
      const atom =
        obj[attrArr[i]] ??
        (baseObj as Exclude<typeof baseObj, undefined>)[attrArr[i]];
      isFirst ? (isFirst = false) : (obj[attrName] += ' ');
      obj[attrName] += atom;
    }
  }

  // If we turn attrs into one attr, we need delete those attrs.
  if (mergeFlag || shorthandFlag) {
    for (let i = 0; i < attrArr.length; i++) {
      delete obj[attrArr[i]];
    }
  }
};

type PaddingConfig = {
  l?: PseudoClassConfig;
  r?: PseudoClassConfig;
  t?: PseudoClassConfig;
  b?: PseudoClassConfig;
} & PseudoClassConfig;

/**
 * A helper function to build padding style.
 *
 * @param config - A value for padding or object with keys below:
 * * `_`: for padding.
 * * `l`: for left padding.
 * * `r`: for right padding.
 * * `t`: for top padding.
 * * `b`: for bottom padding.
 */
const padding = (config: PaddingConfig) => {
  if (isArray(config) || isNull(config) || !isObject(config))
    return pseudoClass('padding', config);

  let result = merge(
    pseudoClass('paddingLeft', config),
    pseudoClass('paddingRight', config),
    pseudoClass('paddingTop', config),
    pseudoClass('paddingBottom', config),
    'l' in config ? pseudoClass('paddingLeft', config.l) : undefined,
    'r' in config ? pseudoClass('paddingRight', config.r) : undefined,
    't' in config ? pseudoClass('paddingTop', config.t) : undefined,
    'b' in config ? pseudoClass('paddingBottom', config.b) : undefined,
  );

  const mergePaddingAttr = (
    obj: { [key: string]: any },
    baseObj?: { [key: string]: any },
  ) =>
    mergeAttr(
      'padding',
      ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      obj,
      baseObj,
    );

  for (const i of pseudoClassArr) {
    if (result[i]) mergePaddingAttr(result[i], result);
  }
  mergePaddingAttr(result);

  return result;
};

type MarginConfig = {
  l?: PseudoClassConfig;
  r?: PseudoClassConfig;
  t?: PseudoClassConfig;
  b?: PseudoClassConfig;
} & PseudoClassConfig;

/**
 * A helper function to build margin style.
 *
 * @param config - A value for margin or object with keys below:
 * * `_`: for margin.
 * * `l`: for left margin.
 * * `r`: for right margin.
 * * `t`: for top margin.
 * * `b`: for bottom margin.
 */
const margin = (config: MarginConfig) => {
  if (isArray(config) || isNull(config) || !isObject(config))
    return pseudoClass('margin', config);

  let result = merge(
    pseudoClass('marginLeft', config),
    pseudoClass('marginRight', config),
    pseudoClass('marginTop', config),
    pseudoClass('marginBottom', config),
    'l' in config ? pseudoClass('marginLeft', config.l) : undefined,
    'r' in config ? pseudoClass('marginRight', config.r) : undefined,
    't' in config ? pseudoClass('marginTop', config.t) : undefined,
    'b' in config ? pseudoClass('marginBottom', config.b) : undefined,
  );

  const mergeMarginAttr = (
    obj: { [key: string]: any },
    baseObj?: { [key: string]: any },
  ) =>
    mergeAttr(
      'margin',
      ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      obj,
      baseObj,
    );

  for (const i of pseudoClassArr) {
    if (result[i]) mergeMarginAttr(result[i], result);
  }
  mergeMarginAttr(result);

  return result;
};

type SpacingConfig = {
  p?: PaddingConfig;
  m?: MarginConfig;
};

/**
 * A helper function to build spacing style.
 *
 * @param config - Object with keys below:
 * * `p`: for padding.
 * * `m`: for margin.
 */
export default (config: SpacingConfig): ThemeUIStyleObject => {
  const { p, m } = config;

  return merge(padding(p ?? {}), margin(m ?? {}));
};
