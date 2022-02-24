import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

interface SignButtonProps {
  className?: string;
}

/**
 * SignButton. A button to go to log page.
 *
 * @param {SignButtonProps} props Holdes:
 * - className. `<string>`. To set its class.
 */
export default (props: SignButtonProps) => {
  const { className } = props;
  const navigate = useNavigate();

  return (
    <Button
      sx={{ gap: '0.25rem' }}
      className={className}
      onClick={() => navigate('/sign')}
    >
      <LogIn size={16} />
      Sign in / Sign up
    </Button>
  );
};
