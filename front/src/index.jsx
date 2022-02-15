import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'theme-ui';
import { Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './store/store';
import { client } from './client';
import theme from './util/theme';

import Index from './page/Index';
import _404 from './page/404';
import Info from './page/Info';
import NewsPage from './page/News';

import Nav from './component/Nav';
import Footer from './component/Footer';
import ScrollToTop from './component/ScrollToTop.tsx';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mock/browser');
  worker.start();
  console.log('Add mock...');
}

/**
 * tailwindcss's preflight style.
 * @see {@link https://tailwindcss.com/docs/preflight}.
 *
 * Mount to set the style auto.
 */
const Preflight = () => (
  <Global
    styles={(theme) => ({
      '*': {
        fontFamily: 'inherit',
        transitionProperty:
          'color, background-color, border-color, ' +
          'text-decoration-color, fill, stroke, opacity, box-shadow, ' +
          'transform, filter, backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
      },
      'blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre': {
        margin: 0,
      },
      'h1, h2, h3, h4, h5, h6': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
      },
      'ol, ul': {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
      'img, svg, video, canvas, audio, iframe, embed, object': {
        display: 'block',
        verticalAlign: 'middle',
      },
      '*, ::before, ::after': {
        borderWidth: 0,
        borderStyle: 'solid',
      },
      a: {
        textDecoration: 'none',
        color: theme.colors.text,
      },
    })}
  />
);

const AppWithTheme = () => {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <ScrollToTop />
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="info" element={<Info />} />
          <Route path="news">
            <Route index element={<_404 />} />
            <Route path=":newsId" element={<NewsPage />} />
          </Route>
          <Route path="*" element={<_404 />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppWithTheme />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement(HMR)
if (import.meta.hot) {
  import.meta.hot.accept();
}
