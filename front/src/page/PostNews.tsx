import { Send, Tag } from 'lucide-react';
import { useState } from 'react';
import { utilMainPart } from '../config';
import { useCreateNews } from '../store/newsSlice';

import Header from '../component/Header';
import TitleInput from '../component/InputSet/TitleInput';
import ImageInput from '../component/InputSet/ImageInput';
import ContentTextArea from '../component/InputSet/ContextTextArea';
import TagListInput from '../component/InputSet/TagListInput';
import TagList from '../component/TagList';

import styles from './styles/PostNews.module.scss';

import toTagList from '../util/toTagList';

export const URL = '/postnews';

export default () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageDataURL, setImageDataURL] = useState('');
  const [tagList, setTagList] = useState([] as string[]);

  const [createNews, { loading, error, data }] = useCreateNews();

  return (
    <div sx={utilMainPart}>
      <Header.Space>
        <Header>Post News</Header>
      </Header.Space>
      <div className={styles.form}>
        <TitleInput onChange={(e) => setTitle(e.target.value)} />
        <ImageInput setDataURL={setImageDataURL} />
        <ContentTextArea onChange={(e) => setContent(e.target.value)} />

        <TagListInput onChange={(e) => setTagList(toTagList(e.target.value))} />
        <TagList tagList={tagList} />
        <div className={styles.buttonRow}>
          <button
            className={styles.button}
            onClick={() => createNews(title, imageDataURL, content, tagList)}
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
