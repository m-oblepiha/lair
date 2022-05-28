import React, { Suspense } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { store, preloadedState } from 'redux/store';
import { Provider } from 'react-redux';
import classes from './App.scss';

import { Loader } from 'app/components';
import { ErrorBoundary } from 'app/components';

import EntryRoute from 'routes/entry/EntryRoute';

const LairRoute = React.lazy(async () => {
  const [component] = await Promise.all([
    import('routes/lair/LairRoute'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]);
  return component;
});

const PetRoute = React.lazy(async () => {
  const [component] = await Promise.all([
    import('routes/pet/PetRoute'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]);
  return component;
});

const App: React.FC = () => {
  return (
    <div className={classes.container}>
      <ErrorBoundary>
        <Provider store={store}>
          <MemoryRouter initialEntries={[preloadedState ? '/lair' : '/']}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<EntryRoute />} />
                <Route path="lair" element={<LairRoute />} />
                <Route path="pet" element={<PetRoute />} />
              </Routes>
            </Suspense>
          </MemoryRouter>
        </Provider>
      </ErrorBoundary>
    </div>
  );
};

export { App };
