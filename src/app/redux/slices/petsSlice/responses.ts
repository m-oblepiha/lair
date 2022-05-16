import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPet } from 'common/types';
import type {
  WakeupCaressResponse,
  AttackPanicResponse,
  AttackCounterResponse,
  AttackAvengeResponse,
  AttackJoinResponse,
  BullyCounterResponse,
  BullyAvengeResponse,
  BullyJoinResponse,
  HealDelightResponse,
  CaressCounterResponse,
  CaressJoinResponse,
  DeathPanicResponse,
} from 'common/types/response';
import { selectPet, clipRelation } from 'common/utils';
import { changeRelation } from 'common/utils/calcs';

const wakeup_caress = (
  state: IPet[],
  action: PayloadAction<WakeupCaressResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.act.actor);

  const morale = target.stats.morale + action.payload.value;
  target.stats.morale = morale > 10 ? 10 : morale;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'caress',
        value: action.payload.value,
      })
  );
};

const attack_panic = (
  state: IPet[],
  action: PayloadAction<AttackPanicResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  if (actor.stats.morale > 0) actor.stats.morale--;
};

const attack_counter = (
  state: IPet[],
  action: PayloadAction<AttackCounterResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.act.actor);

  const health = target.stats.health - action.payload.value;
  target.stats.health = health < 0 ? 0 : health;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'attack',
        value: action.payload.value,
      })
  );
};

const attack_avenge = (
  state: IPet[],
  action: PayloadAction<AttackAvengeResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const actActor = selectPet(state, action.payload.act.actor);
  const actTarget = selectPet(state, action.payload.act.target);

  const health = actActor.stats.health - action.payload.value;
  actActor.stats.health = health < 0 ? 0 : health;

  actActor.relations[actor.id] = clipRelation(
    actActor.relations[actor.id] +
      changeRelation({
        target: actActor,
        type: 'attack',
        value: action.payload.value,
      })
  );

  actTarget.relations[actor.id] = clipRelation(
    actTarget.relations[actor.id] +
      changeRelation({
        target: actTarget,
        type: 'avenge',
        value: action.payload.value,
      })
  );
};

const attack_join = (
  state: IPet[],
  action: PayloadAction<AttackJoinResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const actActor = selectPet(state, action.payload.act.actor);
  const actTarget = selectPet(state, action.payload.act.target);

  const health = actTarget.stats.health - action.payload.value;
  actTarget.stats.health = health < 0 ? 0 : health;

  actTarget.relations[actor.id] = clipRelation(
    actTarget.relations[actor.id] +
      changeRelation({
        target: actTarget,
        type: 'attack',
        value: action.payload.value,
      })
  );

  actActor.relations[actor.id] = clipRelation(
    actActor.relations[actor.id] +
      changeRelation({
        target: actActor,
        type: 'join',
      })
  );
};

const bully_counter = (
  state: IPet[],
  action: PayloadAction<BullyCounterResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.act.actor);

  const morale = target.stats.morale - action.payload.value;
  target.stats.morale = morale < 0 ? 0 : morale;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'bully',
        value: action.payload.value,
      })
  );
};

const bully_avenge = (
  state: IPet[],
  action: PayloadAction<BullyAvengeResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const actActor = selectPet(state, action.payload.act.actor);
  const actTarget = selectPet(state, action.payload.act.target);

  const morale = actActor.stats.morale - action.payload.value;
  actActor.stats.morale = morale < 0 ? 0 : morale;

  actActor.relations[actor.id] = clipRelation(
    actActor.relations[actor.id] +
      changeRelation({
        target: actActor,
        type: 'bully',
        value: action.payload.value,
      })
  );

  actTarget.relations[actor.id] = clipRelation(
    actTarget.relations[actor.id] +
      changeRelation({
        target: actTarget,
        type: 'avenge',
        value: action.payload.value,
      })
  );
};

const bully_join = (
  state: IPet[],
  action: PayloadAction<BullyJoinResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const actActor = selectPet(state, action.payload.act.actor);
  const actTarget = selectPet(state, action.payload.act.target);

  const morale = actTarget.stats.morale - action.payload.value;
  actTarget.stats.morale = morale < 0 ? 0 : morale;

  actTarget.relations[actor.id] = clipRelation(
    actTarget.relations[actor.id] +
      changeRelation({
        target: actTarget,
        type: 'bully',
        value: action.payload.value,
      })
  );

  actActor.relations[actor.id] = clipRelation(
    actActor.relations[actor.id] +
      changeRelation({
        target: actActor,
        type: 'join',
      })
  );
};

const heal_delight = (
  state: IPet[],
  action: PayloadAction<HealDelightResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  if (actor.stats.morale < 10) actor.stats.morale++;
};

const caress_counter = (
  state: IPet[],
  action: PayloadAction<CaressCounterResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const target = selectPet(state, action.payload.act.actor);

  const morale = target.stats.morale + action.payload.value;
  target.stats.morale = morale > 10 ? 10 : morale;

  target.relations[actor.id] = clipRelation(
    target.relations[actor.id] +
      changeRelation({
        target: target,
        type: 'caress',
        value: action.payload.value,
      })
  );
};

const caress_join = (
  state: IPet[],
  action: PayloadAction<CaressJoinResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  const actActor = selectPet(state, action.payload.act.actor);
  const actTarget = selectPet(state, action.payload.act.target);

  const morale = actTarget.stats.morale + action.payload.value;
  actTarget.stats.morale = morale > 10 ? 10 : morale;

  actTarget.relations[actor.id] = clipRelation(
    actTarget.relations[actor.id] +
      changeRelation({
        target: actTarget,
        type: 'caress',
        value: action.payload.value,
      })
  );

  actActor.relations[actor.id] = clipRelation(
    actActor.relations[actor.id] +
      changeRelation({ target: actTarget, type: 'join' })
  );
};

const death_panic = (
  state: IPet[],
  action: PayloadAction<DeathPanicResponse>
) => {
  const actor = selectPet(state, action.payload.actor);
  if (actor.stats.morale > 0) actor.stats.morale--;
};

const responseReducers = {
  wakeup_caress,
  attack_panic,
  attack_counter,
  attack_avenge,
  attack_join,
  bully_counter,
  bully_avenge,
  bully_join,
  heal_delight,
  caress_counter,
  caress_join,
  death_panic,
};

type ResponseType = keyof typeof responseReducers;
const responseTypes = Object.keys(responseReducers) as ResponseType[];

export { responseReducers, responseTypes, type ResponseType };
