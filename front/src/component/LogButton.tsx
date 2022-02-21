import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

interface LogButtonProps {
  className?: string;
}

/**
 * LogButton. A button to go to log page.
 *
 * @param {LogButtonProps} props Holdes:
 * - className. `<string>`. To set its class.
 */
export default (props: LogButtonProps) => {
  const { className } = props;
  const navigate = useNavigate();

  return (
    <Button
      sx={{ gap: '0.25rem' }}
      className={className}
      onClick={() => navigate('/log')}
    >
      <LogIn size={16} />
      Log in / Log on
    </Button>
  );
};
