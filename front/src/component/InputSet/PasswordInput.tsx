import { Lock, Eye } from 'lucide-react';
import Input from './Input';

import type { InputProps } from './Input';

import styles from './styles/PasswordInput.module.scss';

const PasswordInput = (props: InputProps) => {
  const { onChange } = props;

  return (
    <Input.container>
      <Lock className={styles.lock} />
      <input
        placeholder="Password"
        className={styles.passwordInput}
        onChange={onChange}
      />
      <Eye className={styles.eye} />
    </Input.container>
  );
};

export default PasswordInput;
