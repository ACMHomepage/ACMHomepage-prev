import { useParams } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { useEffect } from 'react';

import { utilMainPart } from '../config';
import { useGetNews } from '../store/newsSlice';

import Markdown from '../component/Markdown/Markdown';

import _404 from './404';

import styles from './styles/News.module.scss';

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
    <div className={styles.wrapper}>
      <div className={styles.news}>
        <img src={new_.imageUrl} className={styles.img} />
        <h1 className={styles.header}>{new_.title}</h1>
        <Markdown children={new_.content} className={styles.content} />
      </div>
    </div>
  );
};
