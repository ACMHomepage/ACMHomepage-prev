import PostNews from './PostNews';
import { ThemeProvider } from 'theme-ui';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import theme from '../util/theme';
import { client } from '../client';

test('Make sure `PostNews` looks same as before.', () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <PostNews />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>,
  );

  expect(container).toMatchSnapshot();
});

// TODO: Test its function.
