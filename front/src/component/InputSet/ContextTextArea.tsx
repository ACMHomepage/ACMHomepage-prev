import { AlignLeft } from 'lucide-react';
import { merge } from 'lodash';
import { size } from '@acm-homepage/theme-shortcut';

import Input from '../Input';

const ContentTextArea = (props: {
  content: string;
  setContent: (nickname: string) => void;
}) => {
  const { content, setContent } = props;

  return (
    <Input.container>
      <AlignLeft sx={Input.sx.startIcon()} />
      <textarea
        placeholder="Content"
        sx={merge(Input.sx.input({ hasStartIcon: true }), size({ h: '40rem' }))}
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </Input.container>
  );
};

export default ContentTextArea;
