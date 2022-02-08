import styled from 'styled-components';
import { variant, layout, position } from 'styled-system';
import isUndefined from 'lodash/isUndefined';
import type { ThemeUIStyleObject } from 'theme-ui';
import type { ReactNode } from 'react';

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  withBorder?: boolean;
  theme?: 'primaryFlip' | 'primary' | 'secondaryFlip' | 'secondary';
  className?: string;
  children?: ReactNode;
}

/*
 * Props:
 * - btnSize: 'sm' | 'md'(default) | 'lg'.
 * - withBorder: true | false(default).
 * - theme: 'primaryFlip' | 'primary' | 'secondaryFlip' | 'secondary'.|
 *   [undefined].
 * - className: [string] | [undefined].
 */
export const Button = (props: ButtonProps) => {
  let { size, withBorder, theme, className, children } = props;
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

  // Deal with theme prop.
  const btnTheme: ThemeUIStyleObject = theme
    ? {
        primaryFlip: {
          color: 'primary',
          bg: 'primaryBg',
          borderColor: 'primary',
          ':hover': { color: 'primaryBg', bg: 'primary' },
        },
        primary: {
          color: 'primary',
          bg: 'primaryBg',
          borderColor: 'primary',
          ':hover': { color: 'primary.darker', bg: 'primaryBg.darker' },
        },
        secondaryFlip: {
          color: 'secondary',
          bg: 'secondaryBg',
          borderColor: 'secondary',
          ':hover': { color: 'secondaryBg', bg: 'primary' },
        },
        secondary: {
          color: 'secondary',
          bg: 'secondaryBg',
          borderColor: 'secondary',
          ':hover': { color: 'secondary.darker', bg: 'primaryBg.darker' },
        },
      }[theme]
    : {};

  return (
    <button
      sx={{
        borderRadius: '0.25rem',
        ...btnSize,
        ...border,
        ...btnTheme,
      }}
      className={className}
    >
      {children}
    </button>
  );
};

// export default Button;

// Ready to remove.
export default styled.button(
  {
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    height: '2rem',
  },
  ({ withBorder }: { withBorder: boolean | undefined }) => {
    if (!withBorder) return {};
    return { borderWidth: '1px' };
  },
  variant({
    prop: 'btnTheme',
    variants: {
      primary: {
        color: 'primary',
        bg: 'primaryBg',
        borderColor: 'primary',
        ':hover': {
          color: 'primaryBg',
          bg: 'primary',
        },
      },
      secondary: {
        color: 'secondary',
        bg: 'secondaryBg',
        borderColor: 'secondary',
        ':hover': {
          color: 'secondaryBg',
          bg: 'secondary',
        },
      },
    },
  }),
  variant({
    prop: 'btnSize',
    variants: {
      sm: {
        fontSize: '0.75rem',
        height: '1.5rem',
      },
      md: {},
      lg: {
        fontSize: '1rem',
        height: '2.5rem',
      },
    },
  }),
  layout,
  position,
);
