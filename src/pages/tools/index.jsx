// import { useState, useEffect } from 'react';

import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const Tools = () => (
  <div className="grid grid-rows-[50px_1fr] gap-[10px] container rounded-lg">
    <Header />
    <div
      className="bg-white rounded-lg overflow-auto"
      style={{
        'content-visibility': 'auto',
      }}
    >
      <Outlet />
    </div>
  </div>
);

export default Tools;
