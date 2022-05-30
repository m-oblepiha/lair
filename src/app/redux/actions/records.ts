import { createAction } from '@reduxjs/toolkit';
import type { Record } from 'common/types/message';

const addRecord = createAction<Record, 'records/add'>('records/add');

export { addRecord };
