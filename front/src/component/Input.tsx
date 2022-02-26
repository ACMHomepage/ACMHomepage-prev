import type { ThemeUICSSObject, ThemeUIStyleObject } from 'theme-ui';
import { setBorder, setColor } from '../util/theme';

interface InputProps {
  label?: React.ReactNode;
  labelsx?: ThemeUIStyleObject;
  startIcon?: React.FC<{ className: string }>;
  endIcon?: React.FC<{ className: string }>;
  placeholder?: string;
  value?: [string, React.ChangeEventHandler<HTMLInputElement>];
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
export default (props: InputProps) => {
  const {
    label,
    startIcon: StartIcon,
    endIcon: EndIcon,
    labelsx,
    placeholder,
    value,
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

  return (
    <label>
      {label ? (
        <div sx={{ fontSize: 'sm', mb: '0.25rem', ...labelsx }}>{label}</div>
      ) : null}
      <div sx={{ position: 'relative' }}>
        {StartIcon ? (
          /* @ts-ignore The theme-ui sx prop will turn into className */
          <StartIcon sx={{ top: 0, left: iconPadding, ...iconSx }} />
        ) : null}
        <input
          placeholder={placeholder}
          {...(value ? { value: value[0], onChange: value[1] } : {})}
          sx={{
            fontSize: 'lg',
            height,
            width: '100%',
            padding,
            pl: StartIcon ? height : padding,
            pr: EndIcon ? height : padding,
            outline: 'none',
            ...setColor(),
            ...setBorder({ width: '2px', color: 'bg-3' }),
            '&:hover': {
              ...setBorder({ width: '2px', color: 'fg-6' }),
            },
            '&:focus': {
              bg: 'bg-1',
              outlineColor: 'outline',
              outlineStyle: 'solid',
              outlineWidth: '0.25rem',
              ...setBorder({ width: '2px', color: 'fg-6' }),
            },
          }}
        />
        {EndIcon ? (
          /* @ts-ignore The theme-ui sx prop will turn into className */
          <EndIcon sx={{ top: 0, right: iconPadding, ...iconSx }} />
        ) : null}
      </div>
    </label>
  );
};
