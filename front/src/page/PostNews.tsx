import { Book, Image, AlignLeft, Send } from 'lucide-react';
import { useState, useRef, Ref } from 'react';
import { isNull } from 'lodash';

import { utilMainPart } from '../config';
import { setFlex, setColor, setBorder } from '../util/theme';
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
    <div sx={{ ...utilMainPart }}>
      <Header.Space>
        <Header>Post News</Header>
      </Header.Space>
      <div sx={{ ...setFlex({ direction: 'column', gap: '0.25rem' }) }}>
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
          sx={{ height: '40rem' }}
        />
        <div sx={{ ...setFlex(), justifyContent: 'flex-end' }}>
          <Button
            sx={{
              height: '2.5rem',
              fontSize: 'lg',
              ...setColor({ bg: 'bg-0', color: 'fg-0', hover: { bg: 'bg-2' } }),
              ...setBorder({ width: '2px', color: 'bg-4' }),
              '&:hover': {
                ...setBorder({ width: '2px', color: 'bg-5' }),
              },
            }}
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
