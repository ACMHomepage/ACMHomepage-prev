import type { ThemeUIStyleObject, ColorModesScale } from 'theme-ui';
import { darken } from '@theme-ui/color';
import type { ReactNode } from 'react';
import isUndefined from 'lodash/isUndefined';

import { setColor } from '../util/theme';

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  withBorder?: boolean;
  filp?: boolean;
  color?: ColorModesScale[string];
  bg?: ColorModesScale[string];
  className?: string;
  children?: ReactNode;
}

/**
 * Props:
 * - size: `'sm'` | `'md'`(default) | `'lg'`.
 * - withBorder: `true` | `false`(default).
 * - filp: `true` | `false`(default). If it is `true`, when hover, it will filp
 *   the backgound and frontgound. Or it will let it darker.
 * - color: `<COLOR>` | `'text'`(default). The text and border color.
 * - bg: `<COLOR>` | `'background'`(default).The background color.
 * - className: `<string>` | `undefined`.
 */
export default (props: ButtonProps) => {
  let { size, withBorder, filp, color, bg, className, children } = props;

  // Deal with size prop.
  if (isUndefined(size)) size = 'md';
  const btnSize: ThemeUIStyleObject = {
    sm: { height: '1.5rem', fontSize: '0.75rem' },
    md: { height: '2rem', fontSize: '0.875rem' },
    lg: { height: '2.5rem', fontSize: '1rem' },
  }[size];

  // Deal with withBorder prop.
  if (isUndefined(withBorder)) withBorder = false;
  const border: ThemeUIStyleObject = {
    borderWidth: withBorder ? '1px' : '0px',
  };

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
        borderRadius: '0.25rem',
        ...setColor(color, bg),
        '&:hover': {
          ...setColor(hoverColor, hoverBg, { setColorToBorderColor: false }),
        },
        ...btnSize,
        ...border,
      }}
      className={className}
    >
      {children}
    </button>
  );
};
