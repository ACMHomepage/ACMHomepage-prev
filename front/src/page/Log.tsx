import React from 'react';
import { Lock, User, Eye } from 'lucide-react';
import type { ThemeUICSSObject, ThemeUIStyleObject } from 'theme-ui';

import { utilMainPart } from '../config';
import { setBorder, setColor, setFlex } from '../util/theme';

import Header from '../component/Header';
import Button from '../component/Button';

interface InputProps {
  label?: React.ReactNode;
  startIcon?: React.FC<{ className: string }>;
  endIcon?: React.FC<{ className: string }>;
  labelsx?: ThemeUIStyleObject;
  placeholder?: string;
}

const Input = (props: InputProps) => {
  const {
    label,
    startIcon: StartIcon,
    endIcon: EndIcon,
    labelsx,
    placeholder,
  } = props;

  const iconSize = '2.2rem';
  const height = '3rem';
  const iconPadding = '0.4rem'; // It means that (height - iconWidth) / 2.
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
        {/* @ts-ignore */}
        {StartIcon ? (
          /* @ts-ignore */
          <StartIcon sx={{ top: 0, left: iconPadding, ...iconSx }} />
        ) : null}
        <input
          placeholder={placeholder}
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
          /* @ts-ignore */
          <EndIcon sx={{ top: 0, right: iconPadding, ...iconSx }} />
        ) : null}
      </div>
    </label>
  );
};

/**
 * Page `Log`. Handle the log in / log on.
 */
export default () => {
  return (
    <Header.Space sx={{ ...utilMainPart }}>
      <div
        sx={{
          bg: 'bg-0',
          width: '36rem',
          maxWidth: '100%',
          p: '1rem',
          color: 'text-0',
          ...setBorder({ width: '2px', color: 'bg-2' }),
          ...setFlex({ gap: '1rem', direction: 'column' }),
        }}
      >
        <div
          sx={{
            textAlign: 'center',
            fontSize: '4xl',
            fontWeight: 'h3',
            mb: '1.5rem',
          }}
        >
          ACM Homepage
        </div>
        <Input placeholder="User name" startIcon={User} />
        <Input placeholder="Password" startIcon={Lock} endIcon={Eye} />
        <div sx={{ textAlign: 'right' }}>
          <a sx={{ color: 'link', fontWeight: 'link', fontSize: 'sm' }}>
            Forget password?
          </a>
        </div>
        <Button
          sx={{
            height: '2.5rem',
            fontSize: 'lg',
            mt: '2rem',
            ...setColor({ bg: 'bg-0', color: 'fg-0', hover: { bg: 'bg-2' } }),
            ...setBorder({ width: '2px', color: 'bg-4' }),
            '&:hover': {
              ...setBorder({ width: '2px', color: 'bg-5' }),
            },
          }}
        >
          Log in
        </Button>
      </div>
    </Header.Space>
  );
};
