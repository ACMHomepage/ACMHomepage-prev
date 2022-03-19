import flexbox from './flexbox';

test('flexbox function with config that only have align attr', () => {
  expect(flexbox({ align: { items: 'center' } })).toEqual({
    alignItems: 'center',
  });
  expect(flexbox({ align: { self: 'center' } })).toEqual({
    alignSelf: 'center',
  });
  expect(flexbox({ align: { content: 'center' } })).toEqual({
    alignContent: 'center',
  });
  expect(
    flexbox({ align: { items: 'center', self: 'center', content: 'center' } }),
  ).toEqual({
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  });
});

test('flexbox function with config that only have place attr', () => {
  expect(flexbox({ place: { items: 'center' } })).toEqual({
    placeItems: 'center',
  });
  expect(flexbox({ place: { self: 'center' } })).toEqual({
    placeSelf: 'center',
  });
  expect(flexbox({ place: { content: 'center' } })).toEqual({
    placeContent: 'center',
  });
  expect(
    flexbox({ place: { items: 'center', self: 'center', content: 'center' } }),
  ).toEqual({
    placeItems: 'center',
    placeSelf: 'center',
    placeContent: 'center',
  });
});

test('flexbox function with config that only have dir attr', () => {
  expect(flexbox({ dir: 'row' })).toEqual({
    flexDirection: 'row',
  });
});

test('flexbox function with config that only have flex attr', () => {
  expect(flexbox({ flex: 1 })).toEqual({
    flex: 1,
  });
});

test('flexbox function with config that only have gap attr', () => {
  expect(flexbox({ gap: '1px' })).toEqual({
    gap: '1px',
  });
});

test('flexbox function with config', () => {
  expect(
    flexbox({
      place: { items: 'center', self: 'center', content: 'center' },
      align: { items: 'center', self: 'center', content: 'center' },
      dir: 'column',
      flex: 1,
      gap: '1px',
    }),
  ).toEqual({
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    placeItems: 'center',
    placeSelf: 'center',
    placeContent: 'center',
    flexDirection: 'column',
    flex: 1,
    gap: '1px',
  });
});
