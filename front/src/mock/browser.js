import { setupWorker } from 'msw';
import { handlers } from './handler.js';

console.log('setup worker...');
export const worker = setupWorker(...handlers);
