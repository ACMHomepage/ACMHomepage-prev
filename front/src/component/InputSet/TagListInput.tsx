import { Tag } from 'lucide-react';
import Input from './Input';
import type { InputProps } from './Input';

import styles from './styles/EmailInput.module.scss';//

const TagInput = (props: InputProps) => {
  const { onChange } = props;

  return (
    <Input.container>
      <Tag className={styles.mail} />
      <input
        placeholder="TagList"
        className={styles.emailInput}
        onChange={onChange}
      />
    </Input.container>
  );
};

export default TagInput;
