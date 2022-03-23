import { Book, Image, AlignLeft, Send } from 'lucide-react';
import { useState, useRef } from 'react';
import { isNull, merge } from 'lodash';
import {
  flexbox,
  size,
  font,
  bg,
  text,
  border,
} from '@acm-homepage/theme-shortcut';

import { utilMainPart } from '../config';
import { useCreateNews } from '../store/newsSlice';

import Header from '../component/Header';
import Button from '../component/Button';
import TitleInput from '../component/InputSet/TitleInput';
import ImageInput from '../component/InputSet/ImageInput';
import ContentTextArea from '../component/InputSet/ContextTextArea';

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
      <div sx={flexbox({ dir: 'column', gap: '0.25rem' })}>
        <TitleInput title={title} setTitle={setTitle} />
        <ImageInput setDataURL={setImageDataURL} />
        <ContentTextArea content={content} setContent={setContent} />
        <div sx={flexbox({ place: { content: 'flex' } })}>
          <Button
            sx={merge(
              size({ h: '2.5rem' }),
              font({ size: 'lg' }),
              bg({ col: { _: 'bg-0', hv: 'bg-2' } }),
              text({ col: { _: 'fg-0' } }),
              border({ width: '2px', col: { _: 'bg-4', hv: 'bg-5' } }),
            )}
            onClick={() => createNews(title, imageDataURL, content)}
          >
            <Send size={16} />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
