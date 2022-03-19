import text from './text';

test('text function with config that only have col attr', () => {
  expect(text({ col: 'red' })).toEqual({ color: 'red' });
});

test('text function with config that only have align attr', () => {
  expect(text({ align: 'left' })).toEqual({ textAlign: 'left' });
});

test('text function with config', () => {
  expect(text({ col: 'red', align: 'right' })).toEqual({
    color: 'red',
    textAlign: 'right',
  });
});
