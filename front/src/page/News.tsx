import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { replace } from 'lodash';

import { utilMainPart } from '../config';

import Header from '../component/Header';

import _404 from './404';

const GET_NEWS = gql`
  query News($newsId: Int!) {
    news(id: $newsId) {
      title
      content
      image_uri
    }
  }
`;

export default () => {
  const { newsId } = useParams();
  const { loading, error, data } = useQuery(GET_NEWS, {
    variables: { newsId }
  });

  if(loading) return <div sx={{...utilMainPart}}>Loading</div>;
  if(error) return <div sx={{...utilMainPart}}>Error</div>;

  if(data.news.length !== 1) {
    return <_404 />;
  }

  const new_ = data.news[0];

  return (
    <div sx={{...utilMainPart}}>
      <img src={new_.image_uri} sx={{ width: '100%', height: '50vh', objectFit: 'cover' }} />
      <Header sx={{ textAlign: 'left', my: '1rem' }}>{new_.title}</Header>
      <div dangerouslySetInnerHTML={{ __html: replace(new_.content, /\n/g, '<br />')}} />
    </div>
  );
}
