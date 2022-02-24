import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Lock, User, Eye } from 'lucide-react';
import type { ThemeUICSSObject, ThemeUIStyleObject } from 'theme-ui';
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

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
  value?: [string, React.ChangeEventHandler<HTMLInputElement>];
}

const Input = (props: InputProps) => {
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
        {StartIcon ? (
          /* @ts-ignore */
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
          /* @ts-ignore */
          <EndIcon sx={{ top: 0, right: iconPadding, ...iconSx }} />
        ) : null}
      </div>
    </label>
  );
};

const GET_JWT = gql`
  query SignIn($email: String!, $password: String!) {
    # Input email, password, and no output.
    users(email: $email, password: $password) {
      _
    }
  }
`;

/**
 * Page `Sign`. Handle the sign in / sign on.
 */
export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // TODO: deal with loading state and error state.
  const [
    get_jwt,
    {
      /* Nothing. We just need cookie */
    },
  ] = useLazyQuery(GET_JWT);
  const navigator = useNavigate();

  // TODO: Remember to make sure that the cookie is http only.
  // No error. The cookie will be set by response's header's `Set-Cookie`.
  // TODO: Remember, we cannot deal with the cookie with HttpOnly. Fuck, just
  // deal with it soon.
  useEffect(() => {
    if (Cookie.get('jwt')) {
      // Just go back.
      navigator(-1);
    }
  });

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
        <Input
          placeholder="User name"
          startIcon={User}
          value={[email, (event) => setEmail(event.target.value)]}
        />
        <Input
          placeholder="Password"
          startIcon={Lock}
          endIcon={Eye}
          value={[password, (event) => setPassword(event.target.value)]}
        />
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
          onClick={() => get_jwt({ variables: { email, password } })}
        >
          Sign in
        </Button>
      </div>
    </Header.Space>
  );
};
