import { Mail } from 'lucide-react';
import Input from '../Input';

const EmailInput = (props: {
  email: string;
  setEmail: (nickname: string) => void;
}) => {
  const { email, setEmail } = props;

  return (
    <Input.container>
      <Mail sx={Input.sx.startIcon()} />
      <input
        placeholder="Email"
        sx={Input.sx.input({ hasStartIcon: true })}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </Input.container>
  );
};

export default EmailInput;
