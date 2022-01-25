import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  return (
    <div className="min-h-screen dark:bg-green-900 bg-white">
      {/* Body */}
      <div className="mx-auto w-10/12">
        <p className="dark:text-white text-grenn-900">
          Page has been open for <code>{count}</code> seconds.
        </p>
      </div>
    </div>
  );
}

export default App;
