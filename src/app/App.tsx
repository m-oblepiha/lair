import React, { Suspense } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Loader } from 'common/components';
import './style.global.scss';

import EntryRoute from 'routes/entry/EntryRoute';
const LairRoute = React.lazy(() => import('routes/lair/LairRoute'));
const PetRoute = React.lazy(() => import('routes/pet/PetRoute'));

const App: React.FC = () => {
  return (
    <MemoryRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<EntryRoute />} />
          <Route path="pet" element={<PetRoute />} />
          <Route path="lair" element={<LairRoute />} />
        </Routes>
      </Suspense>
    </MemoryRouter>
  );
};

export { App };
