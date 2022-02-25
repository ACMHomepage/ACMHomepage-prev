import { LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from '../hooks';

import { selectState, AuthStateEnum, signOut } from '../store/authSlice';

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
  const authState = useSelector(selectState);
  const dispatch = useDispatch();

  if (authState !== AuthStateEnum.LoggedWithInfo) {
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
        onClick={() => dispatch(signOut())}
      >
        <LogOut size={16} />
        Sign out
      </Button>
    );
  }
};
