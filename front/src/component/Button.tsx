import type { ReactNode } from 'react';
import React from 'react';
import { merge } from 'lodash';
import {
  spacing,
  layout,
  flexbox,
  text,
  bg,
  border,
} from '@acm-homepage/theme-shortcut';

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Props:
 * - className: `string` | `undefined`.
 * - onClick: `React.MouseEventHandler<HTMLButtonElement>` | `undefined`.
 */
export default (props: ButtonProps) => {
  let { children, ...rest } = props;

  return (
    <button
      sx={merge(
        spacing({ p: '0.25rem' }),
        layout({ display: 'flex' }),
        flexbox({ place: { items: 'center', content: 'center' } }),
        border({ radius: '0.25rem', width: '1px', col: 'bg-4' }),
        text({ col: 'text' }),
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

/**
 * `theme-ui` style object to set filp button.
 *
 * @param color - The text color.
 * @param bg - The background color.
 */
export const buttonFlipStyle = (color = 'bg-0', bgColor = 'fg-0') =>
  merge(
    text({ col: { _: color, hover: bgColor } }),
    bg({ col: { _: bgColor, hover: color } }),
  );
