import { render } from '@testing-library/react';
import { useState } from 'react';
import { ThemeProvider } from 'theme-ui';

import theme from '../../util/theme';
import ContentTextArea from './ContextTextArea';

test('make sure ContentTextArea looks same as before', () => {
  const ContentTextAreaSwapper = () => {
    const [content, setContent] = useState('');

    return (
      <ThemeProvider theme={theme}>
        <ContentTextArea content={content} setContent={setContent} />
      </ThemeProvider>
    );
  };
  const { container } = render(<ContentTextAreaSwapper />);
  expect(container).toMatchSnapshot();
});
