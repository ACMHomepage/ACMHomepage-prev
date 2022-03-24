import { render } from '@testing-library/react';
import { useState } from 'react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../util/theme';
import EmailInput from './EmailInput';

test('make sure EmailInput looks same as before', () => {
  const EmailInputSwapper = () => {
    const [email, setEmail] = useState('');

    return (
      <ThemeProvider theme={theme}>
        <EmailInput email={email} setEmail={setEmail} />
      </ThemeProvider>
    );
  };
  const { container } = render(<EmailInputSwapper />);
  expect(container).toMatchSnapshot();
});
