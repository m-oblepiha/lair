import type { Effect, IPet } from 'common/types';
import type {
  WakeupAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import { clipProbability } from 'common/utils';
import { roll } from 'common/utils/rolls';

const wakeupCaressProbability = (actor: IPet, act: WakeupAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[act.actor] ?? 0;
  return +(rel > 2 && friendliness + morale > 12);
};

const attackPanicProbability = (actor: IPet, act: AttackAct) => {
  const { willpower } = actor.attributes;
  const damage = act.value;
  const [a, b, c, d] = [-3, 5, 1, 0];
  return clipProbability(
    (a * willpower + b * damage + c * roll(1, 10) + d) / 10
  );
};

const attackCounterProbability = (actor: IPet, act: AttackAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const damage = act.value;
  const rel = actor.relations[act.actor];
  const [a, b, c, d, e, f] = [-3, 1, 5, -2, 1, 0];
  return clipProbability(
    (a * friendliness +
      b * morale +
      c * damage +
      d * rel +
      e * roll(1, 10) +
      f) /
      10
  );
};

const attackAvengeProbability = (actor: IPet, act: AttackAct) => {
  const { value: damage } = act;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;
  const [a, b, c, d, e, f] = [-4, 5, 1, 5, 1, -35];
  return clipProbability(
    (a * relActor +
      b * relTarget +
      c * morale +
      d * damage +
      e * roll(1, 10) +
      f) /
      5
  );
};

const attackJoinProbability = (actor: IPet, act: AttackAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;
  const [a, b, c, d, e] = [-5, 2, -5, 1, -1];
  return clipProbability(
    (a * friendliness +
      b * relActor +
      c * relTarget +
      d * roll(1, 10) +
      e * morale) /
      10
  );
};

const healDelightProbability = (actor: IPet, act: HealAct) => {
  const { friendliness } = actor.attributes;
  const rel = actor.relations[act.target];
  const [a, b, c, d] = [2, 2, 1, -20];
  return clipProbability(
    (a * friendliness + b * rel + c * roll(1, 10) + d) / 10
  );
};

const bullyCounterProbability = (actor: IPet, act: BullyAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const damage = act.value;
  const rel = actor.relations[act.actor];
  const [a, b, c, d, e, f] = [-3, 1, 5, -2, 1, 0];
  return clipProbability(
    (a * friendliness +
      b * morale +
      c * damage +
      d * rel +
      e * roll(1, 10) +
      f) /
      10
  );
};

const bullyAvengeProbability = (actor: IPet, act: BullyAct) => {
  const { value: damage } = act;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;
  const [a, b, c, d, e, f] = [-4, 5, 1, 5, 1, -35];
  return clipProbability(
    (a * relActor +
      b * relTarget +
      c * morale +
      d * damage +
      e * roll(1, 10) +
      f) /
      5
  );
};

const bullyJoinProbability = (actor: IPet, act: BullyAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;
  const [a, b, c, d, e] = [-5, 2, -5, 1, -1];
  return clipProbability(
    (a * friendliness +
      b * relActor +
      c * relTarget +
      d * roll(1, 10) +
      e * morale) /
      10
  );
};

const caressCounterProbability = (actor: IPet, act: CaressAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[act.actor];
  const [a, b, c, d, e] = [2, 1, 2, 1, -30];
  return clipProbability(
    (a * friendliness + b * morale + c * rel + d * roll(1, 10) + e) / 8
  );
};

const caressJoinProbability = (actor: IPet, act: CaressAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor] ?? 0;
  const relTarget = actor.relations[act.target] ?? 0;
  const [a, b, c, d, e, f] = [3, 1, 1, 1, 1, -45];
  return clipProbability(
    (a * friendliness +
      b * morale +
      c * relActor +
      d * relTarget +
      e * roll(1, 10) +
      f) /
      10
  );
};

const deathPanicProbability = (actor: IPet, effect: Effect) => {
  const { willpower } = actor.attributes;
  const rel = actor.relations[effect.target];
  const [a, b, c, d] = [-2, 2, 1, 0];
  return clipProbability((a * willpower + b * rel + c * roll(1, 10) + d) / 10);
};

export {
  wakeupCaressProbability,
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
