import React, { useState, useEffect } from 'react';

import { footer } from '../config.jsx';

export default function App() {
  return (
    <React.Fragment>
      <div className="flex-1" />
      <div className="bg-second mt-16 pb-16 pt-4">
        <div className="util-main-part">{footer}</div>
      </div>
    </React.Fragment>
  );
}
