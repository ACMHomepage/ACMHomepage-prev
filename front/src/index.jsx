import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { ApolloProvider } from '@apollo/client';

import { client } from './client.js';
import './index.css';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mock/browser.js');
  worker.start();
  console.log('Add mock...');
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
