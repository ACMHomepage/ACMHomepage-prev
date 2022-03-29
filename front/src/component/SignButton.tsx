import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { flexbox } from '@acm-homepage/theme-shortcut';

import { useSelector } from '../hooks';
import { selectAuthState, AuthStateEnum } from '../store/authSlice';
import { URL as signInUrl } from '../page/SignIn';
import { useSignOut } from '../api/auth';

import Button from './Button';

interface SignInOrRegisterProps {
  className?: string;
}

/**
 * SignInOrRegister. A button to go to sign in / register page.
 *
 * @param props - Holdes:
 * - className. `<string>`. To set its class.
 */
const SignInOrRegister = (props: SignInOrRegisterProps) => {
  const { className } = props;

  const navigate = useNavigate();
  return (
    <Button
      sx={flexbox({ gap: '0.25rem' })}
      className={className}
      onClick={() => navigate(signInUrl)}
    >
      <LogIn size={16} />
      Sign in / Sign up
    </Button>
  );
};

interface SignOutProps {
  className?: string;
}

/**
 * SignOut. A button to go to sign out.
 *
 * @param props - Holdes:
 * - className. `<string>`. To set its class.
 */
const SignOut = (props: SignOutProps) => {
  const { className } = props;

  const signOut = useSignOut();
  const authState = useSelector(selectAuthState);
  const navigate = useNavigate();

  if (authState === AuthStateEnum.Unlogged) {
    // If sign out, then go to the homepage.
    navigate('/');
  }

  // TODO: Let it can sign out.
  return (
    <Button
      sx={flexbox({ gap: '0.25rem' })}
      className={className}
      onClick={() => {
        signOut();
      }}
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
export default (props: SignButtonProps) => {
  const { className } = props;
  const authState = useSelector(selectAuthState);

  if (authState !== AuthStateEnum.LoggedWithInfo) {
    return <SignInOrRegister className={className} />;
  } else {
    return <SignOut className={className} />;
  }
};
