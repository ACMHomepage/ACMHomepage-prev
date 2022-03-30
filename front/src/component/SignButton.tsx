import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { flexbox } from '@acm-homepage/theme-shortcut';

import { useSelector } from '../hooks';
import { selectAuthState, AuthStateEnum } from '../store/authSlice';
import { URL as signInUrl } from '../page/SignIn';
import { useSignOut } from '../api/auth';

import Button from './Button';
import { useEffect } from 'react';

interface SignInOrRegisterProps {
  className?: string;
}

/**
 * SignInOrRegisterButton. A button to go to sign in / register page.
 *
 * @param props - Holdes:
 * - className. `<string>`. To set its class.
 */
const SignInOrRegisterButton = (props: SignInOrRegisterProps) => {
  const { className } = props;

  const navigate = useNavigate();
  return (
    <Button
      sx={flexbox({ gap: '0.25rem' })}
      className={className}
      onClick={() => navigate(signInUrl)}
    >
      <LogIn size={16} />
      Sign in / Register
    </Button>
  );
};

interface SignOutProps {
  className?: string;
}

/**
 * SignOutButton. A button to go to sign out.
 *
 * @param props - Holdes:
 * - className. `<string>`. To set its class.
 */
const SignOutButton = (props: SignOutProps) => {
  const { className } = props;

  const signOut = useSignOut();
  const authState = useSelector(selectAuthState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === AuthStateEnum.Unlogged) {
      // If sign out, then go to the homepage.
      navigate('/');
    }
  }, [authState]);

  // TODO: Let it can sign out.
  return (
    <Button
      sx={flexbox({ gap: '0.25rem' })}
      className={className}
      onClick={signOut}
    >
      <LogOut size={16} />
      Sign out
    </Button>
  );
};

interface SignButtonProps {
  className?: string;
}

/**
 * SignButton. A button to handle the event of signing in, registering and so
 * on.
 *
 * @param props - Holdes:
 * - className. `<string>`. To set its class.
 */
const SignButton = (props: SignButtonProps) => {
  const { className } = props;
  const authState = useSelector(selectAuthState);

  return authState !== AuthStateEnum.LoggedWithInfo ? (
    <SignInOrRegisterButton className={className} />
  ) : (
    <SignOutButton className={className} />
  );
};

export default SignButton;
