import interactivity from './interactivity';

test('interactivity function with config that only have cursor attr', () => {
  expect(interactivity({ cursor: 'pointer' })).toEqual({ cursor: 'pointer' });
});

test('interactivity function with config that only have resize attr', () => {
  expect(interactivity({ resize: 'none' })).toEqual({ resize: 'none' });
});

test('interactivity function with config', () => {
  expect(
    interactivity({
      cursor: 'pointer',
      resize: 'none',
    }),
  ).toEqual({
    cursor: 'pointer',
    resize: 'none',
  });
});
