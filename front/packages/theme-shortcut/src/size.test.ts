import size from './size';

test('width function with a foucs', () => {});

test('size function with config that only have h attr', () => {
  expect(size({ h: '34rem' })).toEqual({ height: '34rem' });

  expect(size({ h: { _: '34rem', min: '20rem', max: '60rem' } })).toEqual({
    height: '34rem',
    minHeight: '20rem',
    maxHeight: '60rem',
  });

  expect(size({ h: { _: '34rem', hover: '40rem' } })).toEqual({
    height: '34rem',
    ':hover': {
      height: '40rem',
    },
  });

  expect(size({ h: { _: { _: '34rem', hover: '40rem' } } })).toEqual({
    height: '34rem',
    ':hover': {
      height: '40rem',
    },
  });

  expect(
    size({ h: { _: { _: '34rem', hover: '40rem' }, min: '2rem' } }),
  ).toEqual({
    height: '34rem',
    minHeight: '2rem',
    ':hover': {
      height: '40rem',
    },
  });

  expect(
    size({
      h: {
        _: '34rem',
        hover: '40rem',
        min: { _: '2rem', hover: '40rem', fc: '56rem' },
      },
    }),
  ).toEqual({
    height: '34rem',
    minHeight: '2rem',
    ':hover': {
      height: '40rem',
      minHeight: '40rem',
    },
    ':focus': {
      minHeight: '56rem',
    },
  });
});

test('size function with config that only have w attr', () => {
  expect(size({ w: '34rem' })).toEqual({ width: '34rem' });

  expect(size({ w: { _: '34rem', min: '20rem', max: '60rem' } })).toEqual({
    width: '34rem',
    minWidth: '20rem',
    maxWidth: '60rem',
  });

  expect(size({ w: { _: '34rem', hover: '40rem' } })).toEqual({
    width: '34rem',
    ':hover': {
      width: '40rem',
    },
  });

  expect(size({ w: { _: { _: '34rem', hover: '40rem' } } })).toEqual({
    width: '34rem',
    ':hover': {
      width: '40rem',
    },
  });

  expect(
    size({ w: { _: { _: '34rem', hover: '40rem' }, min: '2rem' } }),
  ).toEqual({
    width: '34rem',
    minWidth: '2rem',
    ':hover': {
      width: '40rem',
    },
  });

  expect(
    size({
      w: { _: '34rem', hover: '40rem', min: { _: '2rem', hover: '40rem' } },
    }),
  ).toEqual({
    width: '34rem',
    minWidth: '2rem',
    ':hover': {
      width: '40rem',
      minWidth: '40rem',
    },
  });
});

test('size function with config that have h and w attr', () => {
  expect(
    size({
      h: '45rem',
      w: { _: '56rem', min: { _: '30rem', hover: '31rem' } },
    }),
  ).toEqual({
    height: '45rem',
    width: '56rem',
    minWidth: '30rem',
    ':hover': {
      minWidth: '31rem',
    },
  });
});
