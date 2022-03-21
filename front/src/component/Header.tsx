import React from 'react';
import isUndefined from 'lodash/isUndefined';
import { merge } from 'lodash';
import {
  text,
  font,
  spacing,
  flexbox,
  layout,
} from '@acm-homepage/theme-shortcut';

import { mRV } from '../util/theme';

interface HeaderProps {
  children?: React.ReactNode;
  headnumber?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const setFontSize = (name: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  return {
    h1: mRV({ _: '5xl', md: '6xl', lg: '7xl' }),
    h2: mRV({ _: '4xl', md: '5xl', lg: '6xl' }),
    h3: mRV({ _: '3xl', md: '4xl', lg: '5xl' }),
    h4: mRV({ _: '2xl', md: '3xl', lg: '4xl' }),
    h5: mRV({ _: 'xl', md: '2xl', lg: '3xl' }),
    h6: mRV({ _: 'lg', md: 'xl', lg: '2xl' }),
  }[name];
};

const Header = ({ children, headnumber, className }: HeaderProps) => {
  if (isUndefined(headnumber)) headnumber = 1;
  const HeaderName = `h${headnumber}` as keyof JSX.IntrinsicElements;

  return (
    <HeaderName
      sx={merge(
        text({ align: 'center' }),
        font({ size: setFontSize(`h${headnumber}`), weight: `h${headnumber}` }),
      )}
      className={className}
    >
      {children}
    </HeaderName>
  );
};

interface HeaderSpaceProps {
  children?: React.ReactNode;
  className?: string;
}

// TODO: Fix it. Use arrow funtion. Now we cannot, because it has bug in
// Firefox. See https://github.com/emotion-js/emotion/issues/2638.
/**
 * Header.Space. Set the space of the header.
 */
Header.Space = function HeaderSpace(props: HeaderSpaceProps) {
  const { children, className } = props;

  const py = mRV({ _: '6rem', sm: '8rem', md: '8rem' });
  return (
    <div
      sx={merge(
        spacing({ p: { t: py, b: py } }),
        layout({ display: 'flex' }),
        flexbox({ dir: 'column', align: { items: 'center' }, gap: '2rem' }),
      )}
      className={className}
    >
      {children}
    </div>
  );
};

export default Header;
