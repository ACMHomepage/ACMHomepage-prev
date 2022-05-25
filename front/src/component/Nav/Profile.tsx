import { URL as ProfileUrl } from '../../page/Profile';

import LinkButton from './../LinkButton';

import styles from './styles/PostNews.module.scss';

import { useSelector } from '../../hooks';
import { selectAuth, AuthStateEnum } from '../../store/authSlice';

const Profile = () => {
  const auth = useSelector(selectAuth);
  if (auth.state !== AuthStateEnum.LoggedWithInfo)
    return null;
  console.log(auth);
  return (
    <LinkButton
      to={ProfileUrl+'/'+auth.id}
      className={styles.button}
    >
      Profile
    </LinkButton>
  );
};

export default Profile;