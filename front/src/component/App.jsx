import React, { useState, useEffect } from 'react';
import Nav from './Nav.jsx';
import Index from '../page/Index.jsx';

export default function App() {
  return (
    <div
      className={`bg-first min-h-screen dark:text-white text-green-900`}
    >
      {/* Nav */}
      <Nav />
      {/* Body */}
      <Index />
    </div>
  );
}
