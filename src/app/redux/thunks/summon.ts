import type { Thunk } from 'redux/types';
import { effects } from 'redux/slices/petsSlice';
import { generatePet } from 'common/utils/rolls';
import { addRecord } from './addRecord';

const summon = (): Thunk => (dispatch) => {
  const pet = generatePet();
  const summon = effects.summon({ type: 'summon', target: pet });
  dispatch(summon);
  dispatch(addRecord(summon.payload));
};

export { summon };
