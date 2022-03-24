import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { merge } from 'lodash';
import {
  border,
  bg,
  text,
  flexbox,
  font,
  spacing,
  size,
  layout,
} from '@acm-homepage/theme-shortcut';

import { useSelector } from '../hooks';
import { utilMainPart, boxSx } from '../config';
import { useSignIn, selectAuthState, AuthStateEnum } from '../store/authSlice';

import Header from '../component/Header';
import Button from '../component/Button';
import EmailInput from '../component/InputSet/EmailInput';
import PasswordInput from '../component/InputSet/PasswordInput';

export const URL = '/signin';

/**
 * Page `Sign`. Handle the sign in / sign on.
 */
export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const authState = useSelector(selectAuthState);
  const navigator = useNavigate();

  useEffect(() => {
    if (authState === AuthStateEnum.LoggedWithInfo) {
      // Just go back.
      navigator(-1);
    }
  });

  return (
    <Header.Space sx={utilMainPart}>
      <div
        sx={merge(
          layout({ display: 'flex' }),
          flexbox({ gap: '1rem', dir: 'column' }),
          boxSx,
        )}
      >
        <div
          sx={merge(
            text({ align: 'center' }),
            font({ size: '4xl', weight: 'h3' }),
            spacing({ m: { b: '1.5rem' } }),
          )}
        >
          ACM Homepage
        </div>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <div sx={text({ align: 'right' })}>
          <a
            sx={merge(
              text({ col: 'link' }),
              font({ weight: 'link', size: 'sm' }),
            )}
          >
            Forget password?
          </a>
        </div>
        <Button
          sx={merge(
            border({ width: '2px', col: { _: 'bg-4', hv: 'bg-5' } }),
            size({ h: '2.5rem' }),
            font({ size: 'lg' }),
            spacing({ m: { t: '2rem' } }),
            text({ col: 'fg-0' }),
            bg({ col: { _: 'bg-0', hv: 'bg-2' } }),
          )}
          onClick={() => signIn(email, password)}
        >
          Sign in
        </Button>
      </div>
      <div sx={boxSx}>
        New user? Try to <Link to="/register">register</Link>.
      </div>
    </Header.Space>
  );
};
