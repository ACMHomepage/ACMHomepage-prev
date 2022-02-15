import type { ColorModesScale } from 'theme-ui';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

interface LogButtonProps {
  className?: string;
  withBorder?: boolean;
  bg?: ColorModesScale[string];
}

/**
 * LogButton. A button to go to log page.
 *
 * @param {LogButtonProps} props Holdes:
 * - className. `<string>`. To set its class.
 * - withBorder. `<boolean>` | `undefined`. Pass to `Button` component.
 * - bg. `<COLOR>` | `undefined`, Pass to `Button` component.
 */
export default (props: LogButtonProps) => {
  const { className, withBorder, bg } = props;
  const navigate = useNavigate();

  return (
    <Button
      withBorder={withBorder}
      bg={bg}
      sx={{ gap: '0.25rem' }}
      className={className}
      onClick={() => navigate('/log')}
    >
      <LogIn size={16} />
      Log in / Log on
    </Button>
  );
};
