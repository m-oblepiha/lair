import React, { Suspense } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { store } from 'redux/store';
import { Provider } from 'react-redux';
import classes from './App.scss';

import { Loader } from 'common/components';
import EntryRoute from 'routes/entry/EntryRoute';
const LairRoute = React.lazy(() => import('routes/lair/LairRoute'));
const PetRoute = React.lazy(() => import('routes/pet/PetRoute'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <div className={classes.container}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<EntryRoute />} />
              <Route path="pet" element={<PetRoute />} />
              <Route path="lair" element={<LairRoute />} />
            </Routes>
          </Suspense>
        </div>
      </MemoryRouter>
    </Provider>
  );
};

export { App };
