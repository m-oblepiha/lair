import type { ID } from './pet';
import type { ResponseType } from 'redux/slices/petsSlice/drafts/responses';

type Response = {
  type: ResponseType;
  actor: ID;
  target?: ID;
  value: number;
};

export type { Response };
