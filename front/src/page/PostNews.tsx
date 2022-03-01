import { Book, Image, AlignLeft, Send } from 'lucide-react';
import { useState, useRef } from 'react';

import { utilMainPart } from '../config';
import { setFlex, setColor, setBorder } from '../util/theme';

import Header from '../component/Header';
import Input from '../component/Input';
import Button from '../component/Button';

export const URL = '/postnews';

export default () => {
  const [title, setTitle] = useState('');
  const imageRef = useRef(null);
  const [content, setContent] = useState('');

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
          >
            <Send size={16} />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
