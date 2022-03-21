import { useEffect, useState } from 'react';
import { Lock, User, Mail, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { merge } from 'lodash';
import {
  flexbox,
  text,
  font,
  spacing,
  size,
  bg,
  border,
  layout,
} from '@acm-homepage/theme-shortcut';

import { useSelector } from '../hooks';

import { utilMainPart, boxSx } from '../config';
import {
  selectAuthState,
  AuthStateEnum,
  useRegister,
} from '../store/authSlice';

// Import components.
import Header from '../component/Header';
import Button from '../component/Button';
import Input from '../component/Input';

import { URL as signInUrl } from './SignIn';

export const URL = '/register';

/**
 * Page `Sign`. Handle the sign in / sign on.
 */
export default () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authState = useSelector(selectAuthState);
  const navigator = useNavigate();

  const register = useRegister();

  useEffect(() => {
    if (authState === AuthStateEnum.LoggedWithInfo) {
      // Just go back.
      navigator(-1);
    }
  });

  // TODO: Return error if the nickname, email or password is empty.
  // TODO: We do not handler if email is already in database.
  // TODO: We do not show the helpful message in different state.
  return (
    <Header.Space sx={utilMainPart}>
      <div
        sx={merge(
          layout({ display: 'flex' }),
          flexbox({ dir: 'column', gap: '1rem' }),
          boxSx,
        )}
      >
        <div
          sx={merge(
            text({ align: 'center' }),
            font({ size: 'center', weight: 'h3' }),
            spacing({ m: { b: '1.5rem' } }),
          )}
        >
          ACM Homepage
        </div>
        <Input
          placeholder="Nickname"
          startIcon={User}
          value={[nickname, (event) => setNickname(event.target.value)]}
        />
        <Input
          placeholder="Email"
          startIcon={Mail}
          value={[email, (event) => setEmail(event.target.value)]}
        />
        <Input
          placeholder="Password"
          startIcon={Lock}
          endIcon={Eye}
          value={[password, (event) => setPassword(event.target.value)]}
        />
        <Button
          sx={merge(
            size({ h: '2.5rem' }),
            font({ size: 'lg' }),
            spacing({ m: { t: 'lg' } }),
            bg({ col: { _: 'bg-0', hv: 'bg-2' } }),
            text({ col: 'fg-0' }),
            border({ width: '2px', col: { _: 'bg-4', hv: 'bg-5' } }),
          )}
          onClick={() => register(nickname, email, password)}
        >
          Resgister
        </Button>
      </div>
      <div sx={boxSx}>
        Already have an account? Try to <Link to={signInUrl}>sign in</Link>.
      </div>
    </Header.Space>
  );
};
