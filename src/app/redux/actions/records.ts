import { createAction } from '@reduxjs/toolkit';

const addRecord = createAction<string, 'addRecord'>('addRecord');

export { addRecord };
