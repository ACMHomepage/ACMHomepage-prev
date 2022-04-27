import { User } from 'lucide-react';
import Input from './Input';

import type { InputProps } from './Input';

import styles from './styles/NicknameInput.module.scss';

const NickNameInput = (props: InputProps) => {
  const { onChange } = props;

  return (
    <Input.container>
      <User className={styles.user} />
      <input
        placeholder="Nickname"
        className={styles.nicknameInput}
        onChange={onChange}
      />
    </Input.container>
  );
};

export default NickNameInput;
