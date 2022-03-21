import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from '../hooks';
import { Send } from 'lucide-react';
import {
  size,
  bg,
  flexbox,
  layout,
  spacing,
  font,
  border,
} from '@acm-homepage/theme-shortcut';
import { merge } from 'lodash';

import { utilMainPart } from '../config';
import { mRV } from '../util/theme';
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
    <div
      sx={merge(
        layout({ pos: 'sticky', t: 0, z: 50 }),
        size({ w: '100%' }),
        // TODO: delete secondaryBackground. Change it to bg-<number>.
        bg({ col: 'secondaryBackground' }),
      )}
    >
      <nav
        sx={merge(
          layout({ display: 'flex' }),
          flexbox({ align: { items: 'center' }, gap: '1rem' }),
          spacing({ p: { t: '0.75rem', b: '0.75rem' } }),
          size({ h: '3rem' }),
          utilMainPart,
        )}
      >
        <Link to="/" sx={merge(font({ weight: 'bold' }), flexbox({ flex: 1 }))}>
          ACM Homepage
        </Link>
        {/* WARNING: Remember that function button should also be in Dropdown */}
        <DarkToggle
          showText={false}
          sx={layout({ display: mRV({ _: 'none', md: 'flex' }) })}
        />
        <SignButton
          sx={merge(
            layout({ display: mRV({ _: 'none', md: 'flex' }) }),
            size({ h: '2rem' }),
            bg({ col: { _: 'bg-2', hv: 'bg-4' } }),
            border({ col: 'bg-6', width: '2px' }),
          )}
        />
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
