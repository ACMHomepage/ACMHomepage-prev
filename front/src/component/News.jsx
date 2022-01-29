import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_NEWS = gql`
  query News {
    news {
      title
      image_uri
    }
  }
`;

function NewsBody() {
  const { loading, error, data } = useQuery(GET_NEWS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error...</div>;
  }
  console.log(data);
  return (
    <div className="rounded bg-green-100 dark:bg-green-700 p-4">
      Data:
      {data.news.map((value) => (
        <div>
          <span>{value.title}</span>
          <img src={value.image_uri} className="dark:brightness-75" />
        </div>
      ))}
    </div>
  );
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
