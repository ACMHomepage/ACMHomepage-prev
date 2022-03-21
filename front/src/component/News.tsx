import React, { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { merge } from 'lodash';
import { size, bg, flexbox, font, spacing } from '@acm-homepage/theme-shortcut';

import { mRV } from '../util/theme';
import { preloadTime } from '../config';
import { useGetNewsList } from '../store/newsSlice';

import Carousel from './Carousel';
import Button from './Button';

function NewsBody() {
  // Get the news list when this component is mounted.
  const [getNewsList, { loading, error, data, refetch }] = useGetNewsList();

  useEffect(() => {
    getNewsList();
  }, []);

  const HEIGHT = '28rem';

  // Preload those picute.
  useEffect(() => {
    if (!data) return;

    setTimeout(() => {
      for (let i = 0; i < data.getNews.length; i++) {
        let preloadPic = new Image();
        preloadPic.src = data.getNews[i].image_url;
      }
    }, preloadTime);
  }, [data]);

  if (loading) {
    return (
      <div
        sx={merge(
          size({ w: '100%', h: HEIGHT }),
          flexbox({
            gap: '0.5rem',
            place: { content: 'center', items: 'center' },
          }),
          bg({ col: 'bg-2' }),
        )}
      >
        <Loader size={20} />
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <Button
        onClick={() => refetch()}
        sx={merge(
          size({ w: '100%', h: HEIGHT }),
          flexbox({ gap: '0.5rem' }),
          bg({ col: 'bg-2' }),
        )}
      >
        <Loader size={20} />
        Click to retry
      </Button>
    );
  }
  if (data) {
    return (
      <Carousel
        contentMinis={data.getNews}
        rowChangeBreakPoint="md"
        sx={size({ h: HEIGHT })}
      />
    );
  }

  return null;
}

export default function News() {
  return (
    <React.Fragment>
      <h2
        sx={merge(
          font({ weight: 'h2', size: mRV({ _: 'xl', md: '2xl', lg: '3xl' }) }),
          spacing({ m: { b: '1rem' } }),
        )}
      >
        News of ACM
      </h2>
      <NewsBody />
    </React.Fragment>
  );
}
