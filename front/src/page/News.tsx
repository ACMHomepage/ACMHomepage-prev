import { useParams, useNavigate } from 'react-router-dom';
import { replace, isUndefined } from 'lodash';
import { useEffect } from 'react';

import { utilMainPart } from '../config';
import { useGetNews } from '../store/newsSlice';

import Header from '../component/Header';

import _404 from './404';

export default () => {
  const { newsId } = useParams();
  if (isUndefined(newsId)) {
    console.error('news id is undefined');
    return <_404 />;
  }

  // Get the news when it is mounted.
  const [getNews, { loading, data, error }] = useGetNews();
  useEffect(() => {
    getNews(parseInt(newsId));
  }, []);

  if (loading) return <div sx={{ ...utilMainPart }}>Loading</div>;
  if (error) return <div sx={{ ...utilMainPart }}>Error</div>;
  if (!data) return null;

  // We use the newsId to get news data. if the array's length is not 1, must
  // something wrong happend. So just return 404 page.
  if (data.getNews.length !== 1) {
    return <_404 />;
  }

  const new_ = data.getNews[0];

  return (
    <div sx={{ ...utilMainPart }}>
      <img
        src={new_.image_url}
        sx={{ width: '100%', height: '50vh', objectFit: 'cover' }}
      />
      <Header sx={{ textAlign: 'left', my: '1rem' }}>{new_.title}</Header>
      <div
        dangerouslySetInnerHTML={{
          __html: replace(new_.content, /\n/g, '<br />'),
        }}
      />
    </div>
  );
};

