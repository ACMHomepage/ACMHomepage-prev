import spacing from './spacing';

test('spacing function with config that only have p attr', () => {
  expect(spacing({ p: '34rem' })).toEqual({ padding: '34rem' });

  expect(spacing({ p: { _: '34rem', hover: '56rem' } })).toEqual({
    padding: '34rem',
    ':hover': { padding: '56rem' },
  });

  expect(
    spacing({ p: { l: '4rem', r: '4rem', t: '4rem', b: '4rem' } }),
  ).toEqual({
    padding: '4rem',
  });

  expect(spacing({ p: { l: '4rem' } })).toEqual({
    paddingLeft: '4rem',
  });

  expect(spacing({ p: { t: '4rem', b: '4rem' } })).toEqual({
    paddingTop: '4rem',
    paddingBottom: '4rem',
  });

  expect(
    spacing({
      p: {
        _: '34rem',
        l: { _: '56rem', fc: '78rem' },
        r: '56rem',
        t: '78rem',
        b: { _: '1rem', hv: '21rem' },
        hover: '56rem',
      },
    }),
  ).toEqual({
    padding: '78rem 56rem 1rem 56rem',
    ':hover': { padding: '56rem 56rem 21rem 56rem' },
    ':focus': { padding: '78rem 56rem 1rem 78rem' },
  });
});

test('spacing function with config that only have m attr', () => {
  expect(spacing({ m: '34rem' })).toEqual({ margin: '34rem' });

  expect(spacing({ m: { _: '34rem', hover: '56rem' } })).toEqual({
    margin: '34rem',
    ':hover': { margin: '56rem' },
  });

  expect(
    spacing({ m: { l: '4rem', r: '4rem', t: '4rem', b: '4rem' } }),
  ).toEqual({
    margin: '4rem',
  });

  expect(spacing({ m: { l: '4rem' } })).toEqual({
    marginLeft: '4rem',
  });

  expect(spacing({ m: { t: '4rem', b: '4rem' } })).toEqual({
    marginTop: '4rem',
    marginBottom: '4rem',
  });

  expect(
    spacing({
      m: {
        _: '34rem',
        l: { _: '56rem', fc: '78rem' },
        r: '56rem',
        t: '78rem',
        b: { _: '1rem', hv: '21rem' },
        hover: '56rem',
      },
    }),
  ).toEqual({
    margin: '78rem 56rem 1rem 56rem',
    ':hover': { margin: '56rem 56rem 21rem 56rem' },
    ':focus': { margin: '78rem 56rem 1rem 78rem' },
  });
});

test('spacing function with empty config', () => {
  expect(spacing({})).toEqual({});
});
