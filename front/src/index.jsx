import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'theme-ui';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './store/store';
import { client } from './client';
import theme from './util/theme';

// Import pages.
import Index from './page/Index';
import _404 from './page/404';
import Info from './page/Info';
import NewsPage from './page/News';
import SignIn, { URL as signInUrl } from './page/SignIn';
import Resgister, { URL as resgisterUrl } from './page/Register';
import PostNews, { URL as postNewsUrl } from './page/PostNews';

// Import components.
import Nav from './component/Nav';
import Footer from './component/Footer';
import ScrollToTop from './component/ScrollToTop.tsx';
import Preflight from './component/Preflight';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mock/browser');
  worker.start();
  console.log('Add mock...');
}

const App = () => {
  return (
    <React.Fragment>
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
          <Route path={signInUrl} element={<SignIn />} />
          <Route path={resgisterUrl} element={<Resgister />} />
          <Route path={postNewsUrl} element={<PostNews />} />
          <Route path="*" element={<_404 />} />
        </Routes>
        <Footer />
      </div>
    </React.Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
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
