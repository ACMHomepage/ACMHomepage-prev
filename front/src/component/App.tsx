import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Nav from './Nav/Nav';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';

import Index from '../page/Index';
import Info from '../page/Info';
import SignIn, { URL as signInUrl } from '../page/SignIn';
import Resgister, { URL as resgisterUrl } from '../page/Register';
import NewsPage from '../page/News';
import PostNews, { URL as postNewsUrl } from '../page/PostNews';
import _404 from '../page/404';
import Profile from '../page/Profile';

const App = () => {
  return (
    <React.Fragment>
      <ScrollToTop />
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
        <Route path="profile">
          <Route index element={<_404 />} />
          <Route path=":userId" element={<Profile />} />
        </Route>
        <Route path="*" element={<_404 />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

export default App;
