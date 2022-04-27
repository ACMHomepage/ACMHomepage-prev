import { Mail } from 'lucide-react';
import Input from './Input';
import type { InputProps } from './Input';

import styles from './styles/EmailInput.module.scss';

const EmailInput = (props: InputProps) => {
  const { onChange } = props;

  return (
    <Input.container>
      <Mail className={styles.mail} />
      <input
        placeholder="Email"
        className={styles.emailInput}
        onChange={onChange}
      />
    </Input.container>
  );
};

export default EmailInput;
