import { render } from '@testing-library/react';
import { useState } from 'react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../util/theme';
import NicknameInput from './NicknameInput';

test('make sure NicknameInput looks same as before', () => {
  const NicknameInputSwapper = () => {
    const [nickname, setNickname] = useState('');

    return (
      <ThemeProvider theme={theme}>
        <NicknameInput nickname={nickname} setNickname={setNickname} />
      </ThemeProvider>
    );
  };
  const { container } = render(<NicknameInputSwapper />);
  expect(container).toMatchSnapshot();
});
