import outline from './outline';

test('outline function with config that only have width attr', () => {
  expect(outline({ width: '.5rem' })).toEqual({ outlineWidth: '.5rem' });
});

test('outline function with config that only have col attr', () => {
  expect(outline({ col: 'red' })).toEqual({ outlineColor: 'red' });
});

test('outline function with config that only have style attr', () => {
  expect(outline({ style: 'solid' })).toEqual({ outlineStyle: 'solid' });
});

test('outline function with config', () => {
  expect(outline({ width: '.5rem', col: 'red', style: 'solid' })).toEqual({
    outlineWidth: '.5rem',
    outlineColor: 'red',
    outlineStyle: 'solid',
  });
});
