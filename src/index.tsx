import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './style.global.scss';

const container = document.querySelector('#app') as Element;
const root = createRoot(container);
root.render(<App />);
