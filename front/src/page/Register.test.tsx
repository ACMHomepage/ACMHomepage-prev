import type { ReactNode } from 'react';
import { ThemeProvider } from 'theme-ui';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { useLocation } from 'react-router-dom';

import theme from '../util/theme';
import store from '../store/store';
import { register as registerHandler } from '../mock/handler/Auth';
import { client } from '../client';

import Resgister from './Register';

const RegisterWapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ApolloProvider>
  </Provider>
);

test('Make sure `Resgister` looks same as before.', () => {
  const { container } = render(
    <RegisterWapper>
      <MemoryRouter>
        <Resgister />
      </MemoryRouter>
    </RegisterWapper>,
  );

  expect(container).toMatchSnapshot();
});

test('The user can register', async () => {
  const Homepage = () => <div>__Homepage__</div>;
  const _404 = () => {
    const location = useLocation();
    console.log(location);
    return <div>__404__</div>;
  };

  render(
    <RegisterWapper>
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="register" element={<Resgister />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </MemoryRouter>
    </RegisterWapper>,
  );

  // We need at the register page.
  expect(screen.queryByText('__Homepage__')).toBeNull();
  expect(screen.queryByText('__404__')).toBeNull();

  // Enter my infomation to register.
  fireEvent.change(screen.getByPlaceholderText('Nickname'), {
    target: { value: 'Peterlits Zo' },
  });
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'not.peterlitszo@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'admin123' },
  });
  fireEvent.click(screen.getByText('Register'));

  // Now we are at the homepage.
  await waitFor(() => {
    expect(screen.getByText('__Homepage__')).toBeInTheDocument();
    expect(screen.queryByText('__404__')).toBeNull();
  });
});
