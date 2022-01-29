import React from 'react';

import Index from '../page/Index.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <div
      className={`bg-first min-h-screen dark:text-green-100 text-green-900
          flex flex-col`}
    >
      <Nav />
      <Index />
      <Footer />
    </div>
  );
}
