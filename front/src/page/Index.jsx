import React, { useState, useEffect } from 'react';

import News from '../component/News';
import Button from '../component/Button';
import { title } from '../config';

function Headline({ title }) {
  return (
    <div className="py-24 sm:py-32 md:py-40 flex flex-col items-center gap-8">
      <h1
        className={`text-center text-4xl md:text-5xl lg:text-6xl
          font-extrabold`}
      >
        {title}
      </h1>
      <div>
        <Button withBorder filp size="lg" sx={{ width: '12rem' }}>
          More infomation
        </Button>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <React.Fragment>
      <div className="util-main-part">
        <Headline title={title} />
      </div>
      <div className="util-main-part">
        <News />
      </div>
    </React.Fragment>
  );
}
