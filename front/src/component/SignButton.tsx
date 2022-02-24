import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

export enum SignButtonPropType {
  SignOut,
  SignInOrUp,
}

interface SignButtonProps {
  type: SignButtonPropType;
  className?: string;
}

/**
 * SignButton. A button to go to log page.
 *
 * @param {SignButtonProps} props Holdes:
 * - className. `<string>`. To set its class.
 */

export default (props: SignButtonProps) => {
  const { type, className } = props;
  const navigate = useNavigate();

  if (type === SignButtonPropType.SignInOrUp) {
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
  } else {
    // TODO: Let it can sign out.
    return (
      <Button
        sx={{ gap: '0.25rem' }}
        className={className}
      >
        <LogOut size={16} />
        Sign out
      </Button>
    );
  }
};
