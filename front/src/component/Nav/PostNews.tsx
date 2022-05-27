import { URL as postNewsUrl } from '../../page/PostNews';

import LinkButton from './../LinkButton';

import styles from './styles/PostNews.module.scss';

const PostNews = () => {
  return (
    <LinkButton to={postNewsUrl} className={styles.button}>
      Post News
    </LinkButton>
  );
};

export default PostNews;
