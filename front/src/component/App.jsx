import React, { useState, useEffect } from 'react';
import Nav from './Nav.jsx';
import Index from '../page/Index.jsx';

export default function App() {
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
