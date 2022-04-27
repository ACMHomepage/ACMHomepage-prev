import { User } from 'lucide-react';
import Input from './Input';

const NickNameInput = (props: {
  nickname: string;
  setNickname: (nickname: string) => void;
}) => {
  const { nickname, setNickname } = props;

  return (
    <Input.container>
      <User sx={Input.sx.startIcon()} />
      <input
        placeholder="Nickname"
        sx={Input.sx.input({ hasStartIcon: true })}
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      />
    </Input.container>
  );
};

export default NickNameInput;
