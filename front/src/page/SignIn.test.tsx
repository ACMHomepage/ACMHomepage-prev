// TODO: Move `*.test.ts` to folder `__tests__/`.
// TODO: Test that you cannot register two user with the same email.

import type { ReactNode } from 'react';
import { ThemeProvider } from 'theme-ui';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';

import theme from '../util/theme';
import store from '../store/store';
import { client } from '../client';

import SignIn, { URL as signInURL } from './SignIn';
import Register, { URL as registerURL } from './Register';
import SignButton from '../component/SignButton';

const Warpper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ApolloProvider>
  </Provider>
);

test('Make sure `Resgister` looks same as before.', () => {
  const { container } = render(
    <Warpper>
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    </Warpper>,
  );

  expect(container).toMatchSnapshot();
});

test('The user can sign in', async () => {
  const Homepage = () => (
    <div>
      __Homepage__
      <SignButton />
    </div>
  );
  const _404 = () => {
    const location = useLocation();
    console.error(location);
    return <div>__404__</div>;
  };

  render(
    <Warpper>
      <MemoryRouter initialEntries={['/signin']}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path={signInURL} element={<SignIn />} />
          <Route path={registerURL} element={<Register />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </MemoryRouter>
    </Warpper>,
  );

  expect(screen.queryByText('__Homepage__')).toBeNull();
  expect(screen.queryByText('__404__')).toBeNull();

  // Enter email and password, and submit.
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'not.peterlitszo@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'admin123' },
  });
  fireEvent.click(screen.getByText('Sign in'));

  // Of course we cannot. We need register firstly.
  await waitFor(() => {
    expect(
      screen.getByText(
        'Error!! The email not.peterlitszo@gmail.com is not existed',
      ),
    ).toBeInTheDocument();
  });

  // Go to the register page.
  fireEvent.click(screen.getByText('register'));
  await waitFor(() => {
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  // Now we need enter infomation and submit to create new user.
  fireEvent.change(screen.getByPlaceholderText('Nickname'), {
    target: { value: 'PeterlitsZo' },
  });
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'not.peterlitszo@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'admin123' },
  });
  fireEvent.click(screen.getByText('Register'));

  // We will at the homepage with a sign button.
  await waitFor(() => {
    expect(screen.getByText('__Homepage__')).toBeInTheDocument();
  });

  // But we need sign out.
  fireEvent.click(screen.getByText('Sign out'));

  // And now we need to sign in.
  await waitFor(() => {
    expect(screen.getByText('Sign in / Register')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText('Sign in / Register'));

  // Enter email and password, and submit.
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'not.peterlitszo@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'admin123' },
  });
  fireEvent.click(screen.getByText('Sign in'));
});
