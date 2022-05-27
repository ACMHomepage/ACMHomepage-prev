import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from '../hooks';

import { utilMainPart, boxSx } from '../config';
import { selectAuthState, AuthStateEnum } from '../store/authSlice';
import { useRegister } from '../api/auth';

// Import components.
import Header from '../component/Header';
import LinkButton from '../component/LinkButton';
import EmailInput from '../component/InputSet/EmailInput';
import NickNameInput from '../component/InputSet/NicknameInput';
import PasswordInput from '../component/InputSet/PasswordInput';

import styles from './styles/Register.module.scss';

import { URL as signInUrl } from './SignIn';

export const URL = '/register';

/**
 * Page `Register`. Handle the user register event.
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
      // Just go to the homepage.
      navigator('/');
    }
  }, [authState]);

  // TODO: Return error if the nickname, email or password is empty.
  // TODO: We do not handler if email is already in database.
  // TODO: We do not show the helpful message in different state.
  return (
    <Header.Space sx={utilMainPart}>
      <div className={styles.registerBox}>
        <div className={styles.title}>ACM Homepage</div>
        <NickNameInput onChange={(e) => setNickname(e.target.value)} />
        <EmailInput onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput onChange={(e) => setPassword(e.target.value)} />
        <div className={styles.buttonRow}>
          <button
            className={styles.registerButton}
            onClick={() => register(nickname, email, password)}
          >
            Register
          </button>
          <LinkButton className={styles.signInButton} to={signInUrl}>
            Sign In
          </LinkButton>
        </div>
      </div>
    </Header.Space>
  );
};
