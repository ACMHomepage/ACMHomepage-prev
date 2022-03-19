import effect from './effect';

test('effect function with config', () => {
  expect(effect({ opacity: '10%' })).toEqual({
    opacity: '10%',
  });
});
