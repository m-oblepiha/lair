import type { IPet } from 'common/types';
import type {
  WakeupAct,
  AttackAct,
  BullyAct,
  HealAct,
  CaressAct,
} from 'common/types/act';
import type { DeathInteraction } from 'common/types/interaction';
import { clipProbability } from 'common/utils';
import { roll } from 'common/utils/rolls';

const wakeupCaressProbability = (actor: IPet, act: WakeupAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[act.actor.id] ?? 0;

  return +(rel > 2 && friendliness + morale > 12);
};

const attackPanicProbability = (actor: IPet, act: AttackAct) => {
  const { willpower } = actor.attributes;
  const damage = act.value;

  const COEFF = {
    willpowerWeight: -3,
    damageWeight: 5,
    rollWeight: 1,
    offset: 0,
    divisor: 10,
  };

  const result =
    (COEFF.willpowerWeight * willpower +
      COEFF.damageWeight * damage +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const attackCounterProbability = (actor: IPet, act: AttackAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const damage = act.value;
  const rel = actor.relations[act.actor.id];

  const COEFF = {
    friendlinessWeight: -3,
    moraleWeight: 1,
    damageWeight: 5,
    relWeight: -2,
    rollWeight: 1,
    offset: 0,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.damageWeight * damage +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const attackAvengeProbability = (actor: IPet, act: AttackAct) => {
  const { value: damage } = act;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor.id] ?? 0;
  const relTarget = actor.relations[act.target.id] ?? 0;

  const COEFF = {
    relActorWeight: -4,
    relTargetWeight: 5,
    moraleWeight: 1,
    damageWeight: 5,
    rollWeight: 1,
    offset: -35,
    divisor: 5,
  };

  const result =
    (COEFF.relActorWeight * relActor +
      COEFF.relTargetWeight * relTarget +
      COEFF.moraleWeight * morale +
      COEFF.damageWeight * damage +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const attackJoinProbability = (actor: IPet, act: AttackAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor.id] ?? 0;
  const relTarget = actor.relations[act.target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -5,
    relActorWeight: 2,
    relTargetWeight: -5,
    rollWeight: 1,
    moraleWeight: -1,
    offset: 0,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.relActorWeight * relActor +
      COEFF.relTargetWeight * relTarget +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.moraleWeight * morale +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const bullyCounterProbability = (actor: IPet, act: BullyAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const damage = act.value;
  const rel = actor.relations[act.actor.id];

  const COEFF = {
    friendlinessWeight: -3,
    moraleWeight: 1,
    damageWeight: 5,
    relWeight: -2,
    rollWeight: 1,
    offset: 0,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.damageWeight * damage +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const bullyAvengeProbability = (actor: IPet, act: BullyAct) => {
  const { value: damage } = act;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor.id] ?? 0;
  const relTarget = actor.relations[act.target.id] ?? 0;

  const COEFF = {
    relActorWeight: -4,
    relTargetWeight: 5,
    moraleWeight: 1,
    damageWeight: 5,
    rollWeight: 1,
    offset: -35,
    divisor: 5,
  };

  const result =
    (COEFF.relActorWeight * relActor +
      COEFF.relTargetWeight * relTarget +
      COEFF.moraleWeight * morale +
      COEFF.damageWeight * damage +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const bullyJoinProbability = (actor: IPet, act: BullyAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor.id] ?? 0;
  const relTarget = actor.relations[act.target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -5,
    relActorWeight: 2,
    relTargetWeight: -5,
    rollWeight: 1,
    moraleWeight: -1,
    offset: 0,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.relActorWeight * relActor +
      COEFF.relTargetWeight * relTarget +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.moraleWeight * morale +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const healDelightProbability = (actor: IPet, act: HealAct) => {
  const { friendliness } = actor.attributes;
  const rel = actor.relations[act.target.id];

  const COEFF = {
    friendlinessWeight: 2,
    relWeight: 2,
    rollWeight: 1,
    offset: -20,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const caressCounterProbability = (actor: IPet, act: CaressAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const rel = actor.relations[act.actor.id];

  const COEFF = {
    friendlinessWeight: 2,
    moraleWeight: 1,
    relWeight: 2,
    rollWeight: 1,
    offset: -30,
    divisor: 8,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.moraleWeight * morale +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const caressJoinProbability = (actor: IPet, act: CaressAct) => {
  const { friendliness } = actor.attributes;
  const { morale } = actor.stats;
  const relActor = actor.relations[act.actor.id] ?? 0;
  const relTarget = actor.relations[act.target.id] ?? 0;

  const COEFF = {
    friendlinessWeight: -3,
    moraleWeight: 1,
    relActorWeight: 1,
    relTargetWeight: 1,
    rollWeight: 1,
    offset: -45,
    divisor: 10,
  };

  const result =
    (COEFF.friendlinessWeight * friendliness +
      COEFF.relActorWeight * relActor +
      COEFF.relTargetWeight * relTarget +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.moraleWeight * morale +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
};

const deathPanicProbability = (actor: IPet, effect: DeathInteraction) => {
  const { willpower } = actor.attributes;
  const rel = actor.relations[effect.target.id];

  const COEFF = {
    willpowerWeight: -2,
    relWeight: 2,
    rollWeight: 1,
    offset: 0,
    divisor: 10,
  };

  const result =
    (COEFF.willpowerWeight * willpower +
      COEFF.relWeight * rel +
      COEFF.rollWeight * roll(1, 10) +
      COEFF.offset) /
    COEFF.divisor;

  return clipProbability(result);
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
