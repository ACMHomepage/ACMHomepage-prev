import React, { useState, useEffect } from 'react';
import Nav from './Nav.jsx';
import Index from '../page/Index.jsx';

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  return (
    <div
      className={`min-h-screen dark:bg-green-900 bg-white dark:text-white
          text-green-900`}
    >
      {/* Nav */}
      <Nav />
      {/* Body */}
      <Index />
    </div>
  );
}
