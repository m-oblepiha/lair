import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './style.global.scss';
import classes from 'app/App.scss';

const container = document.querySelector('#app') as Element;
container.classList.add(classes.app);
const root = createRoot(container);
root.render(<App />);
