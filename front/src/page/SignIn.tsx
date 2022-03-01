import { useEffect, useState } from 'react';
import { Lock, Mail, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { useSelector } from '../hooks';
import { utilMainPart, boxSx } from '../config';
import { setBorder, setColor, setFlex } from '../util/theme';
import { useSignIn, selectAuthState, AuthStateEnum } from '../store/authSlice';

import Header from '../component/Header';
import Button from '../component/Button';
import Input from '../component/Input';

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
    <Header.Space sx={{ ...utilMainPart }}>
      <div sx={{ ...boxSx, ...setFlex({ gap: '1rem', direction: 'column' }) }}>
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
