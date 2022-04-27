import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '../hooks';
import { utilMainPart } from '../config';
import { selectAuth, AuthStateEnum } from '../store/authSlice';
import { useSignIn } from '../api/auth';
import { URL as registerURL } from './Register';

import Header from '../component/Header';
import EmailInput from '../component/InputSet/EmailInput';
import PasswordInput from '../component/InputSet/PasswordInput';
import LinkButton from '../component/LinkButton';

import styles from './styles/SignIn.module.scss';

export const URL = '/signin';

/**
 * Page `Sign`. Handle the sign in / sign on.
 */
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useSignIn();
  const auth = useSelector(selectAuth);
  const navigator = useNavigate();

  useEffect(() => {
    if (auth.state === AuthStateEnum.LoggedWithInfo) {
      // Just go to the homepage.
      navigator('/');
    }
  }, [auth]);

  return (
    <Header.Space sx={utilMainPart}>
      <div className={styles.signBox}>
        <div className={styles.title}>ACM Homepage</div>
        <EmailInput onChange={e => setEmail(e.target.value)} />
        <PasswordInput password={password} setPassword={setPassword} />
        <div className={styles.forgetPasswordRow}>
          <a>Forget password?</a>
        </div>
        {auth.state === AuthStateEnum.UnloggedWithError ? (
          <div>{`Error!! ${auth.message}`}</div>
        ) : null}
        <div className={styles.buttonRow}>
          <button
            className={styles.signInButton}
            onClick={() => signIn(email, password)}
          >
            Sign in
          </button>
          <LinkButton className={styles.registerButton} to={registerURL}>
            Register
          </LinkButton>
        </div>
      </div>
    </Header.Space>
  );
};

export default SignIn;
