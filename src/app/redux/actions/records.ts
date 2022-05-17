import { createAction } from '@reduxjs/toolkit';

const addRecord = createAction<string, 'records/add'>('records/add');

export { addRecord };
