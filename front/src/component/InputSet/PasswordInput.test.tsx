import { render } from '@testing-library/react';
import { useState } from 'react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../util/theme';
import PasswordInput from './PasswordInput';

test('make sure PasswordInput looks same as before', () => {
  const PasswordInputSwapper = () => {
    const [password, setPassword] = useState('');

    return (
      <ThemeProvider theme={theme}>
        <PasswordInput password={password} setPassword={setPassword} />
      </ThemeProvider>
    );
  };
  const { container } = render(<PasswordInputSwapper />);
  expect(container).toMatchSnapshot();
});
