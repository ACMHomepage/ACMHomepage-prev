import { setupServer } from 'msw/node';
import { handlers } from './handler.js';

// Setup requests interception using the given handlers.
export const server = setupServer(...handlers);
