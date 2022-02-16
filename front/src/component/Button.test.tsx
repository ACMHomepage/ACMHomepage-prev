import { render } from '@testing-library/react';
import Button from './Button';
import { ThemeProvider } from 'theme-ui';
import theme from '../util/theme';

test('make sure Button looks same as before', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button>Hello</Button>
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
})
