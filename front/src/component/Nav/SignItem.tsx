import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '../../hooks';
import { selectAuthState, AuthStateEnum } from '../../store/authSlice';
import { URL as signInUrl } from '../../page/SignIn';
import { useSignOut } from '../../api/auth';

import { useEffect } from 'react';

import styles from './styles/SignItem.module.scss';

/**
 * SignInOrRegisterButton. A button to go to sign in / register page.
 */
const SignInOrRegisterItem = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.signItem} onClick={() => navigate(signInUrl)}>
      <LogIn size={16} />
      Sign in / Register
    </div>
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
const SignOutItem = (props: SignOutProps) => {
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
    <div className={styles.signItem} onClick={signOut}>
      <LogOut size={16} />
      Sign out
    </div>
  );
};

/**
 * SignButton. A button to handle the event of signing in, registering and so
 * on.
 *
 * @param props - Holdes:
 * - className. `<string>`. To set its class.
 */
const SignItem = () => {
  const authState = useSelector(selectAuthState);

  return authState !== AuthStateEnum.LoggedWithInfo ? (
    <SignInOrRegisterItem />
  ) : (
    <SignOutItem />
  );
};

export default SignItem;
