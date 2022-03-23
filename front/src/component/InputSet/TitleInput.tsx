import { Book } from 'lucide-react';
import Input from '../Input';

const TitleInput = (props: {
  title: string;
  setTitle: (nickname: string) => void;
}) => {
  const { title, setTitle } = props;

  return (
    <Input.container>
      <Book sx={Input.sx.startIcon()} />
      <input
        placeholder="Title"
        sx={Input.sx.input({ hasStartIcon: true })}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </Input.container>
  );
};

export default TitleInput;
