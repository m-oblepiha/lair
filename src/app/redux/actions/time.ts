import { createAction } from '@reduxjs/toolkit';

const timePass = createAction<void, 'time/pass'>('time/pass');

export { timePass };
