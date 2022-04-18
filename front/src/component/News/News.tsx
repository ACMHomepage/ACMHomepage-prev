import { useEffect } from 'react';
import { Loader } from 'lucide-react';

import { preloadTime } from '../../config';
import { useGetNewsList } from '../../store/newsSlice';

import styles from './styles/News.module.scss';

import Carousel from './Carousel';

const News = () => {
  // Get the news list when this component is mounted.
  const [getNewsList, { loading, error, data, refetch }] = useGetNewsList();

  useEffect(getNewsList, []);

  // Preload those picute.
  useEffect(() => {
    if (!data) return;

    setTimeout(() => {
      for (let i = 0; i < data.getNews.length; i++) {
        let preloadPic = new Image();
        preloadPic.src = data.getNews[i].imageUrl;
      }
    }, preloadTime);
  }, [data]);

  if (loading) {
    return (
      <div className={styles.News}>
        <Loader size={20} />
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div onClick={() => refetch()} className={styles.News}>
        <Loader size={20} />
        Click to retry
      </div>
    );
  }
  if (data) {
    return <Carousel contentMinis={data.getNews} />;
  }

  return null;
};

export default News;
