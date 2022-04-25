import type { PayloadAction } from '@reduxjs/toolkit';
import type { ID, IPet } from 'common/types';
import { changeRelation } from 'common/utils/calcs';
import { selectPet } from '../utils';

const responseDrafts = {};

type ResponseType = keyof typeof responseDrafts;

export { responseDrafts, type ResponseType };
