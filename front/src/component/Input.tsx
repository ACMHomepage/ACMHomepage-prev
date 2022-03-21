import { forwardRef } from 'react';
import { merge } from 'lodash';
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

import type { ThemeUICSSObject, ThemeUIStyleObject } from 'theme-ui';

interface InputProps {
  label?: React.ReactNode;
  labelsx?: ThemeUIStyleObject;
  startIcon?: React.FC<{ className: string }>;
  endIcon?: React.FC<{ className: string }>;
  placeholder?: string;
  value?: [string, React.ChangeEventHandler<HTMLInputElement>];
  type?: 'file' | 'textarea';
  className?: string;
}

/**
 * Component `Input`. Used to input value.
 *
 * @param props - It holds:
 * - `label`: The label of input.
 * - `labelsx`: The sx prop for label.
 * - `startIcon`: The icon in the input's start position.
 * - `endIcon`: The icon in the input's end position.
 * - `placeholder`: The placeholder for input.
 * - `value`: A tuple, the first one is input's value. And the second one is a
 *   function, which will be called when input is on change.
 */
export default forwardRef((props: InputProps, ref) => {
  const {
    label,
    startIcon: StartIcon,
    endIcon: EndIcon,
    labelsx,
    placeholder,
    value,
    type,
    className,
  } = props;

  const iconSize = '2.2rem';
  const height = '3rem';
  const iconPadding = `calc((${height} - ${iconSize}) / 2)`;
  const padding = '0.5rem';

  const iconSx = {
    position: 'absolute' as ThemeUICSSObject['position'],
    p: '0.5rem',
    height,
    width: iconSize,
  };

  // TODO: This is ugly, try to build a new component Textarea.
  const InputElement = type === 'textarea' ? 'textarea' : 'input';

  return (
    <label>
      {label ? (
        <div
          sx={merge(
            font({ size: 'sm' }),
            spacing({ m: { b: '0.25rem' } }),
            labelsx,
          )}
        >
          {label}
        </div>
      ) : null}
      <div sx={layout({ pos: 'relative' })}>
        {StartIcon ? (
          /* @ts-ignore The theme-ui sx prop will turn into className */
          <StartIcon sx={merge(layout({ t: 0, l: iconPadding }), iconSx)} />
        ) : null}
        <InputElement
          ref={ref}
          placeholder={placeholder}
          type={type}
          {...(value ? { value: value[0], onChange: value[1] } : {})}
          sx={merge(
            font({ size: 'lg' }),
            size({ h: height, w: '100%' }),
            spacing({
              p: {
                _: padding,
                l: StartIcon ? height : padding,
                r: EndIcon ? height : padding,
              },
            }),
            outline({
              col: { fc: 'outline' },
              width: { fc: '0.25rem' },
              style: { fc: 'solid' },
            }),
            border({
              width: { _: '2px', fc: '2px' },
              col: { _: 'bg-3', fc: 'fg-6', hv: 'fg-6' },
            }),
            text({ col: 'fg-0' }),
            bg({ col: { _: 'bg-0', fc: 'bg-1' } }),
            interactivity({ resize: 'vertical' }),
          )}
          className={className}
        />
        {EndIcon ? (
          /* @ts-ignore The theme-ui sx prop will turn into className */
          <EndIcon sx={merge(layout({ t: 0, r: iconPadding }), iconSx)} />
        ) : null}
      </div>
    </label>
  );
});
