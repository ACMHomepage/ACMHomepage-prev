import React from 'react';

import { footer, utilMainPart } from '../config';

export default function App() {
  return (
    <React.Fragment>
      <div sx={{ flex: 1 }} />
      <div
        sx={{ bg: 'secondaryBackground', mt: '4rem', pb: '4rem', pt: '1rem' }}
      >
        <div sx={{ ...utilMainPart }}>{footer}</div>
      </div>
    </React.Fragment>
  );
}
