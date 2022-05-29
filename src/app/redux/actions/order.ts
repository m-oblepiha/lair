import type { ID } from 'common/types';
import { createAction } from '@reduxjs/toolkit';

const removeActor = createAction<ID, 'order/remove'>('order/remove');
const addActors = createAction<ID[], 'order/add'>('order/add');
const shiftTurn = createAction('order/shiftTurn');

export { removeActor, addActors, shiftTurn };
