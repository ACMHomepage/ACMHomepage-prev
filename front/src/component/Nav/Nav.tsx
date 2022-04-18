import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { Send } from 'lucide-react';
import { size, bg, flexbox, layout } from '@acm-homepage/theme-shortcut';
import { merge } from 'lodash';

import { mRV } from '../../util/theme';
import { selectAuth, AuthStateEnum } from '../../store/authSlice';
import { URL as postNewsUrl } from '../../page/PostNews';

import DarkToggle from './DarkToggle';
import Dropdown from './Dropdown';
import SignButton from './SignButton';
import Button from './../Button';
import Logo from './Logo';

import styles from './styles/Nav.module.scss';

export const PostNews = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={merge(
        size({ h: '2rem' }),
        bg({ col: { _: 'bg-2', hv: 'bg-4' } }),
        flexbox({
          dir: 'row',
          gap: '0.25rem',
          place: { content: 'center', items: 'center' },
        }),
      )}
      className={className}
      onClick={() => navigate(postNewsUrl)}
    >
      <Send size={16} />
      Post News
    </Button>
  );
};

/**
 * Nav. A helper bar over **all** pages.
 */
export default () => {
  const auth = useSelector(selectAuth);
  let showPostNews = false;

  if (auth.state === AuthStateEnum.LoggedWithInfo) {
    console.log(auth);
    if (auth.isAdmin) {
      console.log('yes');
      showPostNews = true;
    }
  }

  return (
    <div className={styles.Nav}>
      <nav className={styles.Main}>
        <Logo />
        <span className={styles.Space} />
        <DarkToggle />
        <SignButton />
        {showPostNews ? (
          <PostNews
            sx={merge(layout({ display: mRV({ _: 'none', md: 'flex' }) }))}
          />
        ) : null}
        <Dropdown
          sx={merge(layout({ display: mRV({ _: 'block', md: 'none' }) }))}
        />
      </nav>
    </div>
  );
};
