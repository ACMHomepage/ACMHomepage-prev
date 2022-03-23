import { Lock, Eye } from 'lucide-react';
import Input from '../Input';

const PasswordInput = (props: {
  password: string;
  setPassword: (nickname: string) => void;
}) => {
  const { password, setPassword } = props;

  return (
    <Input.container>
      <Lock sx={Input.sx.startIcon()} />
      <input
        placeholder="Password"
        sx={Input.sx.input({ hasStartIcon: true, hasEndIcon: true })}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Eye sx={Input.sx.endIcon()} />
    </Input.container>
  );
};

export default PasswordInput;
