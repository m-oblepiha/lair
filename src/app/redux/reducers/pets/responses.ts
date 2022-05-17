import type { IPet } from 'common/types';
import {
  wakeupCaress,
  attackPanic,
  attackCounter,
  attackAvenge,
  attackJoin,
  bullyCounter,
  bullyAvenge,
  bullyJoin,
  healDelight,
  caressCounter,
  caressJoin,
  deathPanic,
} from 'redux/actions';
import { selectPet, clipRelation } from 'common/utils';
import { changeRelation } from 'common/utils/calcs';

const wakeupCaressCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof wakeupCaress>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.act.actor.id);

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
const wakeupCaressCase = [wakeupCaress, wakeupCaressCaseReducer] as const;

const attackPanicCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attackPanic>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  if (actor.stats.morale > 0) actor.stats.morale--;
};
const attackPanicCase = [attackPanic, attackPanicCaseReducer] as const;

const attackCounterCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attackCounter>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.act.actor.id);

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
const attackCounterCase = [attackCounter, attackCounterCaseReducer] as const;

const attackAvengeCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attackAvenge>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const actActor = selectPet(state, action.payload.act.actor.id);
  const actTarget = selectPet(state, action.payload.act.target.id);

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
const attackAvengeCase = [attackAvenge, attackAvengeCaseReducer] as const;

const attackJoinCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attackJoin>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const actActor = selectPet(state, action.payload.act.actor.id);
  const actTarget = selectPet(state, action.payload.act.target.id);

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
const attackJoinCase = [attackJoin, attackJoinCaseReducer] as const;

const bullyCounterCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof bullyCounter>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.act.actor.id);

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
const bullyCounterCase = [bullyCounter, bullyCounterCaseReducer] as const;

const bullyAvengeCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof bullyAvenge>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const actActor = selectPet(state, action.payload.act.actor.id);
  const actTarget = selectPet(state, action.payload.act.target.id);

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
const bullyAvengeCase = [bullyAvenge, bullyAvengeCaseReducer] as const;

const bullyJoinCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof bullyJoin>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const actActor = selectPet(state, action.payload.act.actor.id);
  const actTarget = selectPet(state, action.payload.act.target.id);

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
const bullyJoinCase = [bullyJoin, bullyJoinCaseReducer] as const;

const healDelightCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof healDelight>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  if (actor.stats.morale < 10) actor.stats.morale++;
};
const healDelightCase = [healDelight, healDelightCaseReducer] as const;

const caressCounterCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof caressCounter>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const target = selectPet(state, action.payload.act.actor.id);

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
const caressCounterCase = [caressCounter, caressCounterCaseReducer] as const;

const caressJoinCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof caressJoin>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  const actActor = selectPet(state, action.payload.act.actor.id);
  const actTarget = selectPet(state, action.payload.act.target.id);

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
const caressJoinCase = [caressJoin, caressJoinCaseReducer] as const;

const deathPanicCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof deathPanic>
) => {
  const actor = selectPet(state, action.payload.actor.id);
  if (actor.stats.morale > 0) actor.stats.morale--;
};
const deathPanicCase = [deathPanic, deathPanicCaseReducer] as const;

export {
  wakeupCaressCase,
  attackPanicCase,
  attackCounterCase,
  attackAvengeCase,
  attackJoinCase,
  bullyCounterCase,
  bullyAvengeCase,
  bullyJoinCase,
  healDelightCase,
  caressCounterCase,
  caressJoinCase,
  deathPanicCase,
};
