import cryptoRandomString from 'crypto-random-string';

export const salt = cryptoRandomString({
  length: 32,
  type: 'base64',
});
