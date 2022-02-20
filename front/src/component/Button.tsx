import type { ThemeUIStyleObject, ColorModesScale } from 'theme-ui';
import type { ReactNode } from 'react';
import React from 'react';

import { setColor, setBorder, setFlex } from '../util/theme';
import type { ClickableSize } from '../config';
import { clickableSize } from '../config';

interface ButtonProps {
  size?: ClickableSize;
  withBorder?: boolean;
  filp?: boolean;
  color?: ColorModesScale[string];
  bg?: ColorModesScale[string];
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Props:
 * - size: @type {ClickableSize}.
 * - withBorder: `true` | `false`(default).
 * - filp: `true` | `false`(default). If it is `true`, when hover, it will filp
 *   the backgound and frontgound. Or it will let it darker.
 * - color: `<COLOR>` | `'text'`(default). The text and border color.
 * - bg: `<COLOR>` | `'background'`(default).The background color.
 * - className: `string` | `undefined`.
 * - onClick: `React.MouseEventHandler<HTMLButtonElement>` | `undefined`.
 */
export default (props: ButtonProps) => {
  let {
    size,
    withBorder = false,
    filp = false,
    color = 'text',
    bg = 'background',
    children,
    ...rest
  } = props;

  // Deal with size prop.
  const btnSize = clickableSize(size);

  // Deal with withBorder prop.
  const border = setBorder({ width: withBorder ? '1px' : '0px', color });

  // Deal with filp prop.
  let hoverColor = filp ? bg : bg;
  let hoverBg = filp ? color : color;

  return (
    <button
      sx={{
        padding: '0.25rem',
        ...setFlex({ center: true }),
        ...setColor(color, bg),
        '&:hover': {
          ...setColor(hoverColor, hoverBg),
        },
        ...btnSize,
        ...border,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
