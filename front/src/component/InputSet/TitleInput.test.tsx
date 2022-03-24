import { render } from '@testing-library/react';
import { useState } from 'react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../util/theme';
import TitleInput from './TitleInput';

test('make sure TitleInput looks same as before', () => {
  const TitleInputSwapper = () => {
    const [title, setTitle] = useState('');

    return (
      <ThemeProvider theme={theme}>
        <TitleInput title={title} setTitle={setTitle} />
      </ThemeProvider>
    );
  };
  const { container } = render(<TitleInputSwapper />);
  expect(container).toMatchSnapshot();
});
