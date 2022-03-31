// More infomation:
// - Make Jest and MSW run together:
//   https://github.com/mswjs/examples/blob/master/examples/with-jest/jest.setup.js

// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch';

import '@testing-library/jest-dom';

import { server } from './src/mock/server';

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());

afterAll(() => server.close());
