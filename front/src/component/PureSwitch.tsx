import React from 'react';
import { Box, Label } from 'theme-ui';
import type { CSSProperties as CSSProp } from 'theme-ui';

const GUTTER = 2;
const SIZE = 18;

interface SwitchProps {
  gutter?: CSSProp['height'] & CSSProp['width'] & CSSProp['borderRadius'];
  size?: CSSProp['height'] & CSSProp['width'] & CSSProp['borderRadius'];
  className?: string;
  label?: string;
  variant?: string;
  [key: string]: any;
}

export default React.forwardRef(
  (props: SwitchProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    let {
      gutter = GUTTER,
      size = SIZE,
      className,
      label,
      variant = 'switch',
      ...otherProps
    } = props;
    if (typeof gutter === 'number') gutter = gutter + 'px';
    if (typeof size === 'number') size = size + 'px';

    // Hidden checkbox, the really element.
    const Checkbox = (
      <Box
        ref={ref}
        as="input"
        // @ts-ignore
        type="checkbox"
        __themeKey="forms"
        aria-label={label}
        {...otherProps}
        sx={{
          position: 'absolute',
          opacity: 0,
          zIndex: -1,
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
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
          bg: 'gray',
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
            bg: 'background',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            transform: 'translateX(0%)',
            transition: `transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)`,
          },
          'input:checked ~ &': {
            bg: 'text',
            '> div': {
              transform: 'translateX(100%)',
            },
          },
        }}
      >
        <Box />
      </Box>
    );

    if (label) {
      return (
        <Label sx={{ cursor: 'pointer' }}>
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
