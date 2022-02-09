import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'theme-ui';

import store from './store/store';
import { client } from './client';
import './index.css';
import theme from './util/theme';

import Index from './page/Index';
import Nav from './component/Nav';
import Footer from './component/Footer';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mock/browser');
  worker.start();
  console.log('Add mock...');
}

function AppWithTheme() {
  const { isDark } = useSelector((state) => state.darkmode);

  return (
    <ThemeProvider theme={theme}>
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
