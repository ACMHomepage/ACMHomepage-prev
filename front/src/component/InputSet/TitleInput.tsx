import { Book } from 'lucide-react';
import Input from './Input';
import type { InputProps } from './Input';

import styles from './styles/TitleInput.module.scss';

const TitleInput = (props: InputProps) => {
  const { onChange } = props;

  return (
    <Input.container>
      <Book className={styles.book} />
      <input
        placeholder="Title"
        className={styles.titleInput}
        onChange={onChange}
      />
    </Input.container>
  );
};

export default TitleInput;
