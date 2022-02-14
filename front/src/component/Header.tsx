import React from 'react';
import isUndefined from 'lodash/isUndefined';

import { mRV, setFontSize } from '../util/theme';

interface HeaderProps {
  children?: React.ReactNode;
  headnumber?: 1 | 2 | 3 | 4 | 5 | 6;
};

const Header = ({ children, headnumber }: HeaderProps) => {
  if(isUndefined(headnumber)) headnumber = 1;
  const HeaderName = `h${headnumber}` as keyof JSX.IntrinsicElements;

  return (
    <HeaderName
      sx={{
        textAlign: 'center',
        fontSize: setFontSize(`h${headnumber}`),
        fontWeight: `h${headnumber}`,
      }}
    >
      { children }
    </HeaderName>
  );
}

interface HeaderSpaceProps {
  children?: React.ReactNode;
}

// TODO: Fix it. Use arrow funtion. Now we cannot, because it has bug in
// Firefox. See https://github.com/emotion-js/emotion/issues/2638.
Header.Space = function HeaderSpace({ children }: HeaderSpaceProps) {
  return (
    <div
      sx={{
        py: mRV({ _: '6rem', sm: '8rem', md: '8rem' }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      {children}
    </div>
  )
};

export default Header;
