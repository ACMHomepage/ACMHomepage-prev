import border from './border';

test('border function with config that only have width attr', () => {
  expect(border({ width: '1px' })).toEqual({
    borderWidth: '1px',
  });
});

test('border function with config that only have col attr', () => {
  expect(border({ col: 'red' })).toEqual({
    borderColor: 'red',
  });
});

test('border function with config that only have radius attr', () => {
  expect(border({ radius: '5rem' })).toEqual({
    borderRadius: '5rem',
  });

  expect(border({ radius: { _: '5rem', tl: '4rem' } })).toEqual({
    borderRadius: '5rem',
    borderTopLeftRadius: '4rem',
  });

  expect(
    border({ radius: { tl: '4rem', tr: '3rem', bl: '2rem', br: '1rem' } }),
  ).toEqual({
    borderTopLeftRadius: '4rem',
    borderTopRightRadius: '3rem',
    borderBottomLeftRadius: '2rem',
    borderBottomRightRadius: '1rem',
  });
});

test('border function with config', () => {
  expect(
    border({
      col: 'red',
      radius: { tl: '4rem', tr: '3rem', bl: '2rem', br: '1rem' },
      width: '1px',
    }),
  ).toEqual({
    borderWidth: '1px',
    borderColor: 'red',
    borderTopLeftRadius: '4rem',
    borderTopRightRadius: '3rem',
    borderBottomLeftRadius: '2rem',
    borderBottomRightRadius: '1rem',
  });
});
