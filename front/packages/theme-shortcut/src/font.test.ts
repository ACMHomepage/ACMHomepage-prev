import font from './font';

test('font function with config that only have size attr', () => {
  expect(font({ size: 'h1' })).toEqual({ fontSize: 'h1' });
});

test('font function with config that only have weight attr', () => {
  expect(font({ weight: 'h1' })).toEqual({ fontWeight: 'h1' });
});

test('font function with config', () => {
  expect(
    font({
      size: 'h1',
      weight: 'h1',
    }),
  ).toEqual({
    fontSize: 'h1',
    fontWeight: 'h1',
  });
});
