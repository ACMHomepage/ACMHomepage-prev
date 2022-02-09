import { setupWorker } from 'msw';
import { handlers } from './handler';

console.log('setup worker...');
export const worker = setupWorker(...handlers);
