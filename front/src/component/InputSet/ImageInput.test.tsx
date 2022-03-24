import { render } from '@testing-library/react';
import { useState } from 'react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../util/theme';
import ImageInput from './ImageInput';

test('make sure ImageInput looks same as before', () => {
  const ImageInputSwapper = () => {
    const [_dataURL, setDataURL] = useState('');

    return (
      <ThemeProvider theme={theme}>
        <ImageInput setDataURL={setDataURL} />
      </ThemeProvider>
    );
  };
  const { container } = render(<ImageInputSwapper />);
  expect(container).toMatchSnapshot();
});
