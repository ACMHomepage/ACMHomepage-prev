import React, { useState, useEffect } from 'react';

import News from '../component/News.jsx';
import { title } from '../config.jsx';

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
        <button className={`bg-first hover-bg-first border-first rounded p-2`}>
          More infomation
        </button>
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
