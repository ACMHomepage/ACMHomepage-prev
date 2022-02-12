import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'theme-ui';
import { Global } from '@emotion/react';

import store from './store/store';
import { client } from './client';
import theme from './util/theme';

import Index from './page/Index';
import Nav from './component/Nav';
import Footer from './component/Footer';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mock/browser');
  worker.start();
  console.log('Add mock...');
}

const AppWithTheme = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          '*': {
            transitionProperty: 'color, background-color, border-color, '
              + 'text-decoration-color, fill, stroke, opacity, box-shadow, '
              + 'transform, filter, backdrop-filter',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '300ms',
          }
        }}
      />
      <div
        sx={{
          color: 'text',
          bg: 'background',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Nav />
        <Index />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppWithTheme />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement(HMR)
if (import.meta.hot) {
  import.meta.hot.accept();
}
