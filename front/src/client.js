import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const link = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',

  // Use explicit `window.fetch` so tha outgoing requests
  // are captured and deferred until the Service Worker is ready.
  fetch: (...args) => fetch(...args),
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
