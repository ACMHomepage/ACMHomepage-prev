import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from '../hooks';
import { Send } from 'lucide-react';

import { utilMainPart } from '../config';
import { mRV, setColor, setBorder, setFlex } from '../util/theme';
import { selectAuth, AuthStateEnum } from '../store/authSlice';
import { URL as postNewsUrl } from '../page/PostNews';

import DarkToggle from './DarkToggle';
import Dropdown from './Dropdown';
import SignButton from './SignButton';
import Button from './Button';

export const PostNews = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{
        height: '2rem',
        ...setColor({
          bg: 'bg-2',
          hover: { bg: 'bg-4' },
        }),
        ...setFlex({ gap: '0.25rem', center: true, direction: 'row' }),
      }}
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
    <div
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        bg: 'secondaryBackground',
        zIndex: 50,
      }}
    >
      <nav
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& > * + *': { marginLeft: '1rem' },
          py: '0.75rem',
          height: '3rem',
          ...utilMainPart,
        }}
      >
        <Link to="/" sx={{ fontWeight: 'bold', flex: 1 }}>
          ACM Homepage
        </Link>
        {/* WARNING: Remember that function button should also be in Dropdown */}
        <DarkToggle
          showText={false}
          sx={{ display: mRV({ _: 'none', md: 'flex' }) }}
        />
        <SignButton
          sx={{
            display: mRV({ _: 'none', md: 'flex' }),
            height: '2rem',
            ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
            ...setBorder({ color: 'bg-6', width: '2px' }),
          }}
        />
        {showPostNews ? (
          <PostNews
            sx={{
              ...setBorder({ color: 'bg-6', width: '2px' }),
              display: mRV({ _: 'none', md: 'flex' }),
            }}
          />
        ) : null}
        <Dropdown
          sx={{
            ...setBorder({ color: 'bg-6', width: '2px' }),
            display: mRV({ _: 'block', md: 'none' }),
          }}
        />
      </nav>
    </div>
  );
};
