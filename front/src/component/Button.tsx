import type { ReactNode } from 'react';
import React from 'react';

import { setColor, setBorder, setFlex } from '../util/theme';

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
      sx={{
        padding: '0.25rem',
        ...setFlex({ center: true }),
      }}
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
export const buttonFlipStyle = (color = 'bg-0', bg = 'fg-0') =>
  setColor({ color, bg, hover: { color: bg, bg: color } });
