import React, { useState, useEffect } from 'react';

import config from '../config.js';

function Headline({ title }) {
  return (
    <div className="py-40 flex flex-col items-center gap-8">
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

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  return (
    <React.Fragment>
      <div className="main-part">
        <Headline title={config.title} />
      </div>
    </React.Fragment>
  );
}
