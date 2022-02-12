import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Loader } from 'lucide-react';

import Carousel from './Carousel';
import { mRV, setFlex, setColor } from '../util/theme';
import { preloadTime } from '../config';
import Button from './Button';

const GET_NEWS = gql`
  query News {
    news {
      title
      image_uri
      summary
    }
  }
`;

function NewsBody() {
  const { loading, error, data, refetch } = useQuery(GET_NEWS);
  const HEIGHT = '28rem';

  // Preload those picute.
  useEffect(() => {
    if (loading) return;
    if (error) return;
    setTimeout(() => {
      for (let i = 0; i < data.news.length; i++) {
        let preloadPic = new Image();
        preloadPic.src = data.news[i].image_uri;
      }
    }, preloadTime);
  }, [loading, error, data]);

  if (loading) {
    return (
      <div
        sx={{
          width: '100%',
          height: HEIGHT,
          ...setFlex({ center: true, gap: '0.5rem' }),
          ...setColor('text', 'secondaryBackground'),
        }}
      >
        <Loader size={20}/>
        Loading...
      </div>
    );
  } else if (error) {
    return (
      <Button
        onClick={() => refetch()}
        bg="secondaryBackground"
        size="lg"
        sx={{ width: '100%', height: HEIGHT, gap: '0.5rem' }}
      >
        <Loader size={20}/>
        Click to retry
      </Button>
    );
  } else {
    return (
      <Carousel
        contentMinis={data.news}
        rowChangeBreakPoint="md"
        sx={{ height: HEIGHT }}
      />
    );
  }
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
