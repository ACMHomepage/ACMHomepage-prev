import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Carousel from './Carousel.jsx';

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
  return <Carousel titleAndImages={data.news} className="h-96" />;
}

export default function News() {
  return (
    <React.Fragment>
      <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl mb-4">
        News of ACM
      </h2>
      <NewsBody />
    </React.Fragment>
  );
}
