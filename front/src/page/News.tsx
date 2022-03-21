import { useParams, useNavigate } from 'react-router-dom';
import { replace, isUndefined } from 'lodash';
import { merge } from 'lodash';
import { size, layout, text, spacing } from '@acm-homepage/theme-shortcut';
import { useEffect } from 'react';

import { utilMainPart } from '../config';
import { useGetNews } from '../store/newsSlice';

import Header from '../component/Header';

import _404 from './404';

export default () => {
  const { newsId } = useParams();

  if (isUndefined(newsId)) {
    console.error('`newsId` is undefined');
    return <_404 />;
  }

  // Get the news when it is mounted.
  const [getNews, { loading, data, error }] = useGetNews();
  useEffect(() => {
    getNews(parseInt(newsId));
  }, []);

  if (loading) return <div sx={utilMainPart}>Loading</div>;
  if (error) return <div sx={utilMainPart}>Error</div>;
  if (!data) return null;

  // We use the newsId to get news data. if the array's length is not 1, must
  // something wrong happend. So just return 404 page.
  if (data.getNews.length !== 1) {
    console.error('Get two or more news. It should not happen.', data.getNews);
    return <_404 />;
  }

  const new_ = data.getNews[0];

  return (
    <div sx={utilMainPart}>
      <img
        src={new_.image_url}
        sx={merge(
          size({ w: '100%', h: '50vh' }),
          layout({ objectFit: 'cover' }),
        )}
      />
      <Header
        sx={merge(
          text({ align: 'left' }),
          spacing({ m: { t: '1rem', b: '1rem' } }),
        )}
      >
        {new_.title}
      </Header>
      <div
        dangerouslySetInnerHTML={{
          __html: replace(new_.content, /\n/g, '<br />'),
        }}
      />
    </div>
  );
};
