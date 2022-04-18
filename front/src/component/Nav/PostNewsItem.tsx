import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

import { URL as postNewsUrl } from '../../page/PostNews';

import styles from './styles/PostNewsItem.module.scss';

const PostNewsItem = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.postNewsItem} onClick={() => navigate(postNewsUrl)}>
      <Send size={16} />
      Post News
    </div>
  );
};

export default PostNewsItem;
