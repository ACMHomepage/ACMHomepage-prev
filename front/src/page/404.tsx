import { useNavigate } from 'react-router-dom';

import Header from '../component/Header';
import Button from '../component/Button';

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
        filp
        withBorder
        size="lg"
        sx={{ px: '2rem' }}
        onClick={() => navigate('/')}
      >
        Return to homepage
      </Button>
    </Header.Space>
  );
};
