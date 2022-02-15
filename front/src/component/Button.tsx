import type { ThemeUIStyleObject, ColorModesScale } from 'theme-ui';
import { darken } from '@theme-ui/color';
import type { ReactNode } from 'react';
import React from 'react';
import isUndefined from 'lodash/isUndefined';

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
  let { size, withBorder, filp, color, bg, children, ...rest } = props;

  // Deal with size prop.
  const btnSize: ThemeUIStyleObject = clickableSize(size);
  // Deal with withBorder prop.
  if (isUndefined(withBorder)) withBorder = false;
  const border = setBorder({ width: withBorder ? '1px' : '0px' });

  // Deal with color and bg prop.
  if (isUndefined(color)) color = 'text';
  if (isUndefined(bg)) bg = 'background';

  // Deal with filp prop.
  if (isUndefined(filp)) filp = false;
  let hoverColor = filp ? bg : darken(color, 0.1);
  let hoverBg = filp ? color : darken(bg, 0.1);

  return (
    <button
      sx={{
        padding: '0.25rem',
        ...setFlex({ center: true }),
        ...setColor(color, bg),
        '&:hover': {
          ...setColor(hoverColor, hoverBg, { setColorToBorderColor: false }),
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
