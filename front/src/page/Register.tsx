import { useEffect, useState } from 'react';
import { Lock, User, Mail, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { useSelector } from '../hooks';

import { utilMainPart, boxSx } from '../config';
import { setBorder, setColor, setFlex } from '../util/theme';
import { selectState, AuthStateEnum, useSignUp } from '../store/authSlice';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authState = useSelector(selectState);
  const navigator = useNavigate();

  const signUp = useSignUp();

  useEffect(() => {
    if (authState === AuthStateEnum.LoggedWithInfo) {
      // Just go back.
      navigator(-1);
    }
  });

  // TODO: Return error if the name, email or password is empty.
  // TODO: We do not handler if email is already in database.
  // TODO: We do not show the helpful message in different state.
  return (
    <Header.Space sx={{ ...utilMainPart }}>
      <div sx={{ ...boxSx, ...setFlex({ direction: 'column', gap: '1rem' }) }}>
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
          value={[name, (event) => setName(event.target.value)]}
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
          onClick={() => signUp(name, email, password)}
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
