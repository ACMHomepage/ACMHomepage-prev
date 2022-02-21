import { useNavigate } from 'react-router-dom';

import Header from '../component/Header';
import Button, { buttonFlipStyle } from '../component/Button';
import { setBorder } from '../util/theme';

export default () => {
  const navigate = useNavigate();

  return (
    <Header.Space>
      <Header>404 Page</Header>
      <Header headnumber={5}>
        Page not found.
        <br />
        Please check your URL is right.
      </Header>
      <Button
        sx={{
          px: '2rem',
          fontSize: 'xl',
          height: '3rem',
          ...buttonFlipStyle(),
          ...setBorder({ width: '2px', color: 'fg-0' }),
        }}
        onClick={() => navigate('/')}
      >
        Return to homepage
      </Button>
    </Header.Space>
  );
};
