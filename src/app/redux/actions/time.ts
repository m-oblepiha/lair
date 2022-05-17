import { createAction } from '@reduxjs/toolkit';

const timePass = createAction<void, 'timePass'>('timePass');

export { timePass };
