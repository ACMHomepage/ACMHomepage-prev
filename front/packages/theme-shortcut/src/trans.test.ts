import trans from './trans';

test('trans function with config that only have transform attr', () => {
  expect(trans({ transform: 'scale(.5)' })).toEqual({ transform: 'scale(.5)' });
});

test('trans function with config that only have transition attr', () => {
  expect(trans({ transition: 'none' })).toEqual({ transitionProperty: 'none' });
});

test('trans function with config', () => {
  expect(trans({ transform: 'scale(.5)', transition: 'none' })).toEqual({
    transform: 'scale(.5)',
    transitionProperty: 'none',
  });
});
