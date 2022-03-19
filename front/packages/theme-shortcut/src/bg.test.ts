import bg from './bg';

test('bg function with config', () => {
  expect(bg({ col: 'red' })).toEqual({
    backgroundColor: 'red',
  });
});
