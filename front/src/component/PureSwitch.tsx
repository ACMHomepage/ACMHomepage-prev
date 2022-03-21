import React from 'react';
import { Box, Label } from 'theme-ui';
import type { CSSProperties as CSSProp } from 'theme-ui';
import { merge } from 'lodash';
import {
  layout,
  size as sizeFunc,
  effect,
  flexbox,
  interactivity,
} from '@acm-homepage/theme-shortcut';

const GUTTER = 2;
const SIZE = 18;

interface SwitchProps {
  gutter?: CSSProp['height'] & CSSProp['width'] & CSSProp['borderRadius'];
  size?: CSSProp['height'] & CSSProp['width'] & CSSProp['borderRadius'];
  className?: string;
  label?: React.ReactNode;
  inner?: boolean;
  variant?: string;
  [key: string]: any;
}

/**
 * PureSwitch. Thanks for theme-ui's `@theme-ui/component`.
 *
 * It is a `div` element, which has two(or there) children: The first one is
 * hidden really checkbox; The seconde one is the switch just for show. The
 * seconde one, the switch for show, holds two `div` element: The outer one (aka
 * `Outer`) and the inner one(aka `Inner`).
 *
 * @param props It holds:
 * - `gutter`: `<SIZE>` | undefined. The gap betwen `Inner` and `Outer`. If it
 *   is undefined, it will set to `2px`.
 * - `size`: `<SIZE>` | undefined. The `Inner`'s size. If it is undefined, it
 *   will set to `18px`.
 * - `className`: `<string>`. To set the class.
 * - `label`: `<React.ReactNode>` | undefined. Is the 3-rd children of this
 *   component, or in the `Inner` (hold by `inner` attr).
 * - `inner`: `true` | `false`(default). Set the position of the `label`.
 * - `variant`: `<string>`. What the fuck is it?
 * - others will pass to the hidden switch.
 */
export default React.forwardRef(
  (props: SwitchProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    let {
      gutter = GUTTER,
      size = SIZE,
      className,
      label,
      inner = false,
      variant = 'switch',
      ...otherProps
    } = props;
    if (typeof gutter === 'number') gutter = gutter + 'px';
    if (typeof size === 'number') size = size + 'px';

    // Hidden checkbox, the really element.
    const Checkbox = (
      <Box
        tabIndex={-1}
        ref={ref}
        as="input"
        // @ts-ignore
        type="checkbox"
        __themeKey="forms"
        aria-label={label}
        {...otherProps}
        sx={merge(
          layout({ pos: 'absolute', z: -1, overflow: 'hideen' }),
          sizeFunc({ w: 1, h: 1 }),
          effect({ opacity: 0 }),
        )}
      />
    );

    // The switch just for show.
    const Switch = (
      <Box
        css={{
          padding: gutter,
        }}
        // @ts-ignore
        __themeKey="forms"
        variant={variant}
        className={className}
        __css={{
          position: 'relative',
          flexShrink: 0,
          bg: 'fg-0',
          borderRadius: size,
          height: `calc(${size} + ${gutter} * 2)`,
          width: `calc(${size} * 2 + ${gutter} * 2)`,
          'input:disabled ~ &': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
          '& > div': {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '50%',
            height: size,
            width: size,
            bg: 'bg-0',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            transform: 'translateX(0%)',
            transition: `transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)`,
          },
          'input:checked ~ &': {
            '> div': {
              transform: 'translateX(100%)',
            },
          },
        }}
      >
        <Box sx={flexbox({ place: { content: 'center', items: 'center' } })}>
          {label && inner ? <>{label}</> : null}
        </Box>
      </Box>
    );

    if (label && !inner) {
      return (
        <Label sx={interactivity({ cursor: 'pointer' })}>
          {Checkbox}
          {Switch}
          <span>{label}</span>
        </Label>
      );
    }

    return (
      <React.Fragment>
        {Checkbox}
        {Switch}
      </React.Fragment>
    );
  },
);
