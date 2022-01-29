import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { ApolloProvider } from '@apollo/client';

import { client } from './client.js';
import './index.css';

import Index from './page/Index.jsx';
import Nav from './component/Nav.jsx';
import Footer from './component/Footer.jsx';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mock/browser.js');
  worker.start();
  console.log('Add mock...');
}

function App() {
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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
