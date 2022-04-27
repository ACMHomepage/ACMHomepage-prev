import { AlignLeft } from 'lucide-react';

import Input from './Input';
import type { InputProps } from './Input';

import styles from './styles/ContextTextArea.module.scss';

const ContentTextArea = (props: InputProps) => {
  const { onChange } = props;

  return (
    <Input.container>
      <AlignLeft className={styles.alignLeft} />
      <textarea
        placeholder="Content"
        className={styles.contextTextArea}
        onChange={onChange}
      />
    </Input.container>
  );
};

export default ContentTextArea;
