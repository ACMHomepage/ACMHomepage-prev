import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Carousel from './Carousel';
import { mRV } from '../util/theme';

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
  const { loading, error, data } = useQuery(GET_NEWS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <Carousel
      contentMinis={data.news}
      rowChangeBreakPoint="md"
      sx={{ height: '28rem' }}
    />
  );
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
