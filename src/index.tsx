import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.global.scss';

const container = document.querySelector('#app');
const root = createRoot(container);

import('./app/App').then(({ App }) => {
  root.render(<App />);
});
