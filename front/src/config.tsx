import type { ThemeUIStyleObject } from 'theme-ui';
import { mRV } from './util/theme';

export const title = (
  <span>
    Soochow University
    <br />
    ACM Homepage
  </span>
);

export const footer = <span>This is footer.</span>;

export const utilMainPart: ThemeUIStyleObject = {
  mx: 'auto',
  px: '1rem',
  width: mRV({
    _: '100%',
    lg: `${(100 * 10) / 12}%`,
    xl: `${(100 * 8) / 12}%`,
  }),
};

// After 500ms, we will try to preload some picute, etc. to get better feel.
export const preloadTime = 500;
