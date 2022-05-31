import type { IPet } from 'common/types';
import type { AttackAct, BullyAct, HealAct, CaressAct } from 'common/types/act';
import type { DeathInteraction } from 'common/types/interaction';
import { roll } from './roll';

const attackPanicProbability = (actor: IPet, act: AttackAct) => {
  const { willpower } = actor.attributes;
  const damage = act.value;

  const result = damage > willpower / 2;

  return +result;
};

const attackCounterProbability = (actor: IPet, act: AttackAct) => {
  const { friendliness, willpower } = actor.attributes;

  const result = friendliness < 10 && willpower > 5 && roll(1, 10) > 4;

  return +result;
};

const attackAvengeProbability = (actor: IPet, act: AttackAct) => {
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;

  const result = relTarget > relActor && morale > 4 && roll(1, 10) > 7;

  return +result;
};

const attackJoinProbability = (actor: IPet, act: AttackAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;

  const result =
    morale < 9 && relActor > relTarget && friendliness < roll(1, 10);

  return +result;
};

const bullyCounterProbability = (actor: IPet, act: BullyAct) => {
  const { friendliness, willpower } = actor.attributes;
  const rel = actor.relations[act.actor] ?? 0;

  const result =
    rel < 1 && friendliness < 8 && willpower > 5 && roll(1, 10) > 5;

  return +result;
};

const bullyAvengeProbability = (actor: IPet, act: BullyAct) => {
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;

  const result = relTarget > relActor && morale > 4 && roll(1, 10) > 7;

  return +result;
};

const bullyJoinProbability = (actor: IPet, act: BullyAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;

  const result =
    morale < 9 && relActor > relTarget && friendliness < roll(1, 10);

  return +result;
};

const healDelightProbability = (actor: IPet, act: HealAct) => {
  const { friendliness } = actor.attributes;

  const result = friendliness > 4 && roll(1, 10) > 8;

  return +result;
};

const caressCounterProbability = (actor: IPet, act: CaressAct) => {
  const { friendliness } = actor.attributes;
  const rel = actor.relations[act.actor] ?? 0;

  const result = friendliness / 2 + rel > roll(1, 10);

  return +result;
};

const caressJoinProbability = (actor: IPet, act: CaressAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;

  const result =
    relActor + relTarget > 2 &&
    morale > 5 &&
    friendliness > 6 &&
    roll(1, 10) > 6;

  return +result;
};

const deathPanicProbability = (actor: IPet, effect: DeathInteraction) => {
  const rel = actor.relations[effect.target.id] ?? 0;

  return +(rel > 0);
};

export {
  attackCounterProbability,
  attackPanicProbability,
  attackAvengeProbability,
  attackJoinProbability,
  healDelightProbability,
  bullyAvengeProbability,
  bullyCounterProbability,
  bullyJoinProbability,
  caressCounterProbability,
  caressJoinProbability,
  deathPanicProbability,
};
