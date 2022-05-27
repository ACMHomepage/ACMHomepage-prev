import { merge } from 'lodash';
import React, { useState, useImperativeHandle, forwardRef, Ref } from 'react';
import {
  font,
  spacing,
  layout,
  size,
  outline,
  border,
  bg,
  interactivity,
  text,
} from '@acm-homepage/theme-shortcut';

const iconSize = '2.2rem';
const height = '3rem';
const iconPadding = `calc((${height} - ${iconSize}) / 2)`;
const padding = '0.5rem';

const iconSx = merge(
  layout({ pos: 'absolute' }),
  text({ col: 'fg-0' }),
  spacing({ p: padding }),
  size({ h: height, w: iconSize }),
);

/**
 * @example
 * ```typescript
 * <Input.container>
 *   <StartIcon sx={Input.sx.startIcon} />
 *   <input
 *     sx={Input.sx.input({ hasStartIcon: true })}
 *     value={value}
 *     onChange={(event) => setValue(event.target.value)}
 *   />
 * </Input.container>
 * ```
 */
const input = {
  container: (props: { children: React.ReactNode }) => (
    <label sx={layout({ pos: 'relative', display: 'block' })}>
      {props.children}
    </label>
  ),
  sx: {
    input: (config?: { hasStartIcon?: boolean; hasEndIcon?: boolean }) => {
      const { hasStartIcon, hasEndIcon } = config ?? {};
      return merge(
        font({ size: 'lg' }),
        size({ h: height, w: '100%' }),
        spacing({
          p: {
            _: padding,
            l: hasStartIcon ? height : padding,
            r: hasEndIcon ? height : padding,
          },
        }),
        outline({
          col: { fc: 'outline' },
          width: { fc: '0.25rem' },
          style: { fc: 'solid' },
        }),
        border({
          radius: '0.25rem',
          width: '1px',
          col: { _: 'bg-8', fc: 'fg-6', hv: 'fg-6' },
        }),
        text({ col: 'fg-0' }),
        bg({ col: { _: 'bg-0', fc: 'bg-1' } }),
        interactivity({ resize: 'vertical' }),
      );
    },
    startIcon: () => {
      return merge(layout({ t: 0, l: iconPadding }), iconSx);
    },
    endIcon: () => {
      return merge(layout({ t: 0, r: iconPadding }), iconSx);
    },
  },
};

interface InputBaseProp extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputBase = forwardRef((props: InputBaseProp, ref: Ref<any>) => {
  const [content, setContent] = useState('');
  useImperativeHandle(
    ref,
    () => ({
      getValue: () => {
        return content;
      },
    }),
    [content],
  );

  return (
    <input ref={ref} onChange={(e) => setContent(e.target.value)} {...props} />
  );
});

interface TextareaBaseProp
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextareaBase = forwardRef(
  (props: TextareaBaseProp, ref: Ref<any>) => {
    const [content, setContent] = useState('');
    useImperativeHandle(
      ref,
      () => ({
        getValue: () => {
          return content;
        },
      }),
      [content],
    );

    return (
      <textarea
        ref={ref}
        onChange={(e) => setContent(e.target.value)}
        {...props}
      />
    );
  },
);

export interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default input;
