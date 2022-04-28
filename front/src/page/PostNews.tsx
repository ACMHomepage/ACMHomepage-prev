import { Send } from 'lucide-react';
import { useState } from 'react';
import { utilMainPart } from '../config';
import { useCreateNews } from '../store/newsSlice';

import Header from '../component/Header';
import TitleInput from '../component/InputSet/TitleInput';
import ImageInput from '../component/InputSet/ImageInput';
import ContentTextArea from '../component/InputSet/ContextTextArea';

import styles from './styles/PostNews.module.scss';

export const URL = '/postnews';

export default () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageDataURL, setImageDataURL] = useState('');
  const [createNews, { loading, error, data }] = useCreateNews();

  return (
    <div sx={utilMainPart}>
      <Header.Space>
        <Header>Post News</Header>
      </Header.Space>
      <div className={styles.form}>
        <TitleInput onChange={e => setTitle(e.target.value)} />
        <ImageInput setDataURL={setImageDataURL} />
        <ContentTextArea onChange={e => setContent(e.target.value)} />
        <div className={styles.buttonRow}>
          <button
            className={styles.button}
            onClick={() => createNews(title, imageDataURL, content)}
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
