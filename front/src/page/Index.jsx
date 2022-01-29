import React, { useState, useEffect } from 'react';

import News from '../component/News.jsx';
import config from '../config.jsx';

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
        <a
          className={`border border-green-900 hover:bg-green-900
            hover:text-white dark:border-white dark:hover:bg-white
            dark:hover:text-green-900 rounded p-2 cursor-pointer`}
        >
          More infomation
        </a>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <React.Fragment>
      <div className="util-main-part">
        <Headline title={config.title} />
      </div>
      <div className="util-main-part">
        <News />
      </div>
    </React.Fragment>
  );
}
