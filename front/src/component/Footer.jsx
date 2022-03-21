import React from 'react';
import { merge } from 'lodash';
import { flexbox, bg, spacing } from '@acm-homepage/theme-shortcut';

import { footer, utilMainPart } from '../config';

export default function App() {
  return (
    <React.Fragment>
      <div sx={flexbox({ flex: 1 })} />
      <div
        sx={merge(
          bg({ col: 'secondaryBackground' }),
          spacing({ m: { t: '4rem' }, p: { b: '4rem', t: '1rem' } }),
        )}
      >
        <div sx={{ ...utilMainPart }}>{footer}</div>
      </div>
    </React.Fragment>
  );
}
