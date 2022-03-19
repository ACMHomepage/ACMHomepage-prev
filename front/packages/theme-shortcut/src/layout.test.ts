import layout from './layout';

test('layout function with config that only have pos attr', () => {
  expect(layout({ pos: 'absolute' })).toEqual({ position: 'absolute' });
});

test('layout function with config that only have r, l, t, b, z attr', () => {
  expect(layout({ r: '.5rem' })).toEqual({ right: '.5rem' });
  expect(layout({ l: '.5rem' })).toEqual({ left: '.5rem' });
  expect(layout({ t: '.5rem' })).toEqual({ top: '.5rem' });
  expect(layout({ b: '.5rem' })).toEqual({ bottom: '.5rem' });
  expect(layout({ z: '.5rem' })).toEqual({ zIndex: '.5rem' });
});

test('layout function with config that only have objectFit attr', () => {
  expect(layout({ objectFit: 'cover' })).toEqual({ objectFit: 'cover' });
});

test('layout function with config that only have display attr', () => {
  expect(layout({ display: 'flex' })).toEqual({ display: 'flex' });
});

test('layout function with config that only have overflow attr', () => {
  expect(layout({ overflow: 'hidden' })).toEqual({ overflow: 'hidden' });
});

test('layout function with config', () => {
  expect(
    layout({
      pos: 'absolute',
      r: '.5rem',
      l: '.5rem',
      t: '.5rem',
      b: '.5rem',
      z: '.5rem',
      objectFit: 'cover',
      display: 'flex',
      overflow: 'hidden',
    }),
  ).toEqual({
    bottom: '.5rem',
    display: 'flex',
    left: '.5rem',
    objectFit: 'cover',
    overflow: 'hidden',
    position: 'absolute',
    right: '.5rem',
    top: '.5rem',
    zIndex: '.5rem',
  });
});
