import type { IPet } from 'common/types';
import {
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
import { selectPet, unsafeSelectPet, clipRelation } from 'common/utils';
import { changeRelation } from 'common/utils/calcs';

const attackPanicCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attackPanic>
) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  if (actor.stats.morale > 0) actor.stats.morale--;
};
const attackPanicCase = [attackPanic, attackPanicCaseReducer] as const;

const attackCounterCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof attackCounter>
) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  const target = unsafeSelectPet(state, action.payload.act.actor);

  const health = target.stats.health - action.payload.value;
  target.stats.health = health < 0 ? 0 : health;

  target.relations[actor.id] = clipRelation(
    (target.relations[actor.id] ?? 0) +
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
  const actor = unsafeSelectPet(state, action.payload.actor);
  const actActor = unsafeSelectPet(state, action.payload.act.actor);
  const actTarget = selectPet(state, action.payload.act.target);

  const health = actActor.stats.health - action.payload.value;
  actActor.stats.health = health < 0 ? 0 : health;

  actActor.relations[actor.id] = clipRelation(
    (actActor.relations[actor.id] ?? 0) +
      changeRelation({
        target: actActor,
        type: 'attack',
        value: action.payload.value,
      })
  );

  if (actTarget)
    actTarget.relations[actor.id] = clipRelation(
      (actTarget.relations[actor.id] ?? 0) +
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
  const actor = unsafeSelectPet(state, action.payload.actor);
  const actActor = unsafeSelectPet(state, action.payload.act.actor);
  const actTarget = unsafeSelectPet(state, action.payload.act.target);

  const health = actTarget.stats.health - action.payload.value;
  actTarget.stats.health = health < 0 ? 0 : health;

  actTarget.relations[actor.id] = clipRelation(
    (actTarget.relations[actor.id] ?? 0) +
      changeRelation({
        target: actTarget,
        type: 'attack',
        value: action.payload.value,
      })
  );

  actActor.relations[actor.id] = clipRelation(
    (actActor.relations[actor.id] ?? 0) +
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
  const actor = unsafeSelectPet(state, action.payload.actor);
  const target = unsafeSelectPet(state, action.payload.act.actor);

  const morale = target.stats.morale - action.payload.value;
  target.stats.morale = morale < 0 ? 0 : morale;

  target.relations[actor.id] = clipRelation(
    (target.relations[actor.id] ?? 0) +
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
  const actor = unsafeSelectPet(state, action.payload.actor);
  const actActor = unsafeSelectPet(state, action.payload.act.actor);
  const actTarget = unsafeSelectPet(state, action.payload.act.target);

  const morale = actActor.stats.morale - action.payload.value;
  actActor.stats.morale = morale < 0 ? 0 : morale;

  actActor.relations[actor.id] = clipRelation(
    (actActor.relations[actor.id] ?? 0) +
      changeRelation({
        target: actActor,
        type: 'bully',
        value: action.payload.value,
      })
  );

  actTarget.relations[actor.id] = clipRelation(
    (actTarget.relations[actor.id] ?? 0) +
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
  const actor = unsafeSelectPet(state, action.payload.actor);
  const actActor = unsafeSelectPet(state, action.payload.act.actor);
  const actTarget = unsafeSelectPet(state, action.payload.act.target);

  const morale = actTarget.stats.morale - action.payload.value;
  actTarget.stats.morale = morale < 0 ? 0 : morale;

  actTarget.relations[actor.id] = clipRelation(
    (actTarget.relations[actor.id] ?? 0) +
      changeRelation({
        target: actTarget,
        type: 'bully',
        value: action.payload.value,
      })
  );

  actActor.relations[actor.id] = clipRelation(
    (actActor.relations[actor.id] ?? 0) +
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
  const actor = unsafeSelectPet(state, action.payload.actor);
  if (actor.stats.morale < 10) actor.stats.morale++;
};
const healDelightCase = [healDelight, healDelightCaseReducer] as const;

const caressCounterCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof caressCounter>
) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  const target = unsafeSelectPet(state, action.payload.act.actor);

  const morale = target.stats.morale + action.payload.value;
  target.stats.morale = morale > 10 ? 10 : morale;

  target.relations[actor.id] = clipRelation(
    (target.relations[actor.id] ?? 0) +
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
  const actor = unsafeSelectPet(state, action.payload.actor);
  const actActor = unsafeSelectPet(state, action.payload.act.actor);
  const actTarget = unsafeSelectPet(state, action.payload.act.target);

  const morale = actTarget.stats.morale + action.payload.value;
  actTarget.stats.morale = morale > 10 ? 10 : morale;

  actTarget.relations[actor.id] = clipRelation(
    (actTarget.relations[actor.id] ?? 0) +
      changeRelation({
        target: actTarget,
        type: 'caress',
        value: action.payload.value,
      })
  );

  actActor.relations[actor.id] = clipRelation(
    (actActor.relations[actor.id] ?? 0) +
      changeRelation({ target: actActor, type: 'join' })
  );
};
const caressJoinCase = [caressJoin, caressJoinCaseReducer] as const;

const deathPanicCaseReducer = (
  state: IPet[],
  action: ReturnType<typeof deathPanic>
) => {
  const actor = unsafeSelectPet(state, action.payload.actor);
  if (actor.stats.morale > 0) actor.stats.morale--;
};
const deathPanicCase = [deathPanic, deathPanicCaseReducer] as const;

export {
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
