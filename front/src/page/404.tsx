import { useNavigate } from 'react-router-dom';
import { merge } from 'lodash';
import { spacing, font, size, border } from '@acm-homepage/theme-shortcut';

import Header from '../component/Header';
import Button, { buttonFlipStyle } from '../component/Button';

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
        sx={merge(
          spacing({ p: { l: '2rem', r: '2rem' } }),
          font({ size: 'xl' }),
          size({ h: '3rem' }),
          border({ width: '2px', col: 'fg-0' }),
          buttonFlipStyle(),
        )}
        onClick={() => navigate('/')}
      >
        Return to homepage
      </Button>
    </Header.Space>
  );
};
