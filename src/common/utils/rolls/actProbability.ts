import type { IPet } from 'common/types';
import { clipProbability } from 'common/utils/calcs';
import { roll } from 'common/utils/rolls';

const sleepProbability = (actor: IPet) => {
  const { fatigue } = actor.stats;
  const [a, b, c] = [0.5625, 0.05, -1.125];
  return clipProbability(fatigue * a + roll(1, 10) * b + c);
};

const wakeupProbability = (actor: IPet) => {
  const { fatigue, hunger } = actor.stats;
  return clipProbability((hunger * roll(1, 10) - fatigue * roll(1, 10)) / 20);
};

const supplyProbability = (actor: IPet) => {
  const { hunger } = actor.stats;
  const [a, b, c] = [0.5625, 0.05, -1.125];
  return clipProbability(hunger * a + roll(1, 10) * b + c);
};

const attackProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;
  const [a, b, c, d, e] = [-5, -2, -5, 1, 30];
  return clipProbability(
    (a * friendliness + b * morale + c * rel + d * roll(1, 10) + e) / 10
  );
};

const healProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;
  const [a, b, c, d, e] = [5, 2, 5, 2, -70];
  return clipProbability(
    (a * friendliness + b * morale + c * rel + d * roll(1, 10) + e) / 10
  );
};

const bullyProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;
  const [a, b, c, d, e] = [-5, -2, -5, 1, 40];
  return clipProbability(
    (a * friendliness + b * morale + c * rel + d * roll(1, 10) + e) / 10
  );
};

const caressProbability = (actor: IPet, target: IPet) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[target.id] ?? 0;
  const [a, b, c, d, e] = [5, 2, 5, 2, -50];
  return clipProbability(
    (a * friendliness + b * morale + c * rel + d * roll(1, 10) + e) / 10
  );
};

export {
  sleepProbability,
  wakeupProbability,
  supplyProbability,
  attackProbability,
  healProbability,
  bullyProbability,
  caressProbability,
};
