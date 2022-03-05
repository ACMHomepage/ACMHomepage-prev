import React, { useEffect } from 'react';
import { Loader } from 'lucide-react';

import { mRV, setFlex, setColor } from '../util/theme';
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
        sx={{
          width: '100%',
          height: HEIGHT,
          ...setFlex({ center: true, gap: '0.5rem' }),
          ...setColor({ bg: 'bg-2' }),
        }}
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
        sx={{
          width: '100%',
          height: HEIGHT,
          gap: '0.5rem',
          ...setColor({ bg: 'bg-2' }),
        }}
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
        sx={{ height: HEIGHT }}
      />
    );
  }

  return null;
}

export default function News() {
  return (
    <React.Fragment>
      <h2
        sx={{
          fontWeight: 'h2',
          fontSize: mRV({ _: 'xl', md: '2xl', lg: '3xl' }),
          mb: '1rem',
        }}
      >
        News of ACM
      </h2>
      <NewsBody />
    </React.Fragment>
  );
}
