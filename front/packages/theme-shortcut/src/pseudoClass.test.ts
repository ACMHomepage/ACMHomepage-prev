import pseudoClass from './pseudoClass';

test('pseudoClass function with a object', () => {
  expect(pseudoClass('height', { _: '50rem', hover: '40rem' })).toEqual({
    height: '50rem',
    ':hover': { height: '40rem' },
  });

  expect(pseudoClass('height', { _: '50rem', hv: '40rem' })).toEqual({
    height: '50rem',
    ':hover': { height: '40rem' },
  });

  expect(pseudoClass('height', { _: '50rem', focus: '40rem' })).toEqual({
    height: '50rem',
    ':focus': { height: '40rem' },
  });

  expect(pseudoClass('height', { _: '50rem', fc: '40rem' })).toEqual({
    height: '50rem',
    ':focus': { height: '40rem' },
  });
});

test('pseudoClass function with a deep object', () => {
  expect(
    pseudoClass('height', {
      _: { _: { _: '50rem', fc: '45rem' }, hover: '30rem' },
    }),
  ).toEqual({
    height: '50rem',
    ':hover': { height: '30rem' },
    ':focus': { height: '45rem' },
  });

  expect(pseudoClass('height', { _: { _: '50rem', hover: '30rem' } })).toEqual({
    height: '50rem',
    ':hover': { height: '30rem' },
  });

  expect(
    pseudoClass('height', {
      _: { _: '50rem', hover: '30rem' },
      hover: '40rem',
    }),
  ).toEqual({
    height: '50rem',
    ':hover': { height: '40rem' },
  });
});

test('pseudoClass function with a string', () => {
  expect(pseudoClass('height', '50rem')).toEqual({
    height: '50rem',
  });
});

test('pseudoClass function with nullable value', () => {
  expect(pseudoClass('height', null)).toEqual({});

  expect(pseudoClass('height', undefined)).toEqual({});
});
