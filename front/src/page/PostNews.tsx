import { Book, Image, AlignLeft, Send } from 'lucide-react';
import { useState, useRef, Ref } from 'react';
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
import { setColor } from '../util/theme';
import { useCreateNews } from '../store/newsSlice';

import Header from '../component/Header';
import Input from '../component/Input';
import Button from '../component/Button';

export const URL = '/postnews';

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default () => {
  const [title, setTitle] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [createNews, { loading, error, data }] = useCreateNews();

  const submit = () => {
    // TODO: handle those cases.
    if (isNull(imageRef.current)) return;
    if (isNull(imageRef.current.files)) return;

    // TODO: Better idea: Add a image post bar, which can turn a image to a
    // HTTP URL auto rather than DATA URL.
    const image = imageRef.current.files[0];
    toBase64(image).then((image_uri) => {
      createNews(title, image_uri, content);
    });
  };

  return (
    <div sx={utilMainPart}>
      <Header.Space>
        <Header>Post News</Header>
      </Header.Space>
      <div sx={flexbox({ dir: 'column', gap: '0.25rem' })}>
        <Input
          startIcon={Book}
          placeholder="Title"
          value={[title, (e) => setTitle(e.target.value)]}
        />
        <Input startIcon={Image} type="file" ref={imageRef} />
        <Input
          startIcon={AlignLeft}
          placeholder="Content"
          type="textarea"
          value={[content, (e) => setContent(e.target.value)]}
          sx={size({ h: '40rem' })}
        />
        <div sx={flexbox({ place: { content: 'flex' } })}>
          <Button
            sx={merge(
              size({ h: '2.5rem' }),
              font({ size: 'lg' }),
              bg({ col: { _: 'bg-0', hv: 'bg-2' } }),
              text({ col: { _: 'fg-0' } }),
              border({ width: '2px', col: { _: 'bg-4', hv: 'bg-5' } }),
            )}
            onClick={submit}
          >
            <Send size={16} />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
