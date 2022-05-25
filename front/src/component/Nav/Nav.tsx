import { useSelector } from '../../hooks';
import { layout } from '@acm-homepage/theme-shortcut';
import { merge } from 'lodash';

import { mRV } from '../../util/theme';
import { selectAuth, AuthStateEnum } from '../../store/authSlice';

import DarkToggle from './DarkToggle';
import Dropdown from './Dropdown';
import SignButton from './SignButton';
import PostNews from './PostNews';
import Logo from './Logo';
import Profile from './Profile';

import styles from './styles/Nav.module.scss';

/**
 * Nav. A helper bar over **all** pages.
 */
export default () => {
  const auth = useSelector(selectAuth);
  let showPostNews = false;
  let showProfile = false;
  if (auth.state === AuthStateEnum.LoggedWithInfo) {
    console.log(auth);
    if (auth.isAdmin) {
      console.log('yes');
      showPostNews = true;
    }
    showProfile = true;
  }

  return (
    <div className={styles.Nav}>
      <nav className={styles.Main}>
        <Logo />
        <span className={styles.Space} />
        <DarkToggle />
        <SignButton />
        {showPostNews ? (
          <PostNews />
        ) : null}
        {showProfile ?(
          <Profile />
        ) : null
        }

        <Dropdown
          sx={merge(layout({ display: mRV({ _: 'block', md: 'none' }) }))}
        />
      </nav>
    </div>
  );
};
