import type { IPet } from 'common/types';

type ArgsWithoutValue = {
  target: IPet;
  type: 'join' | 'share' | 'steal';
};
type ArgsWithValue = {
  target: IPet;
  type: 'attack' | 'bully' | 'caress' | 'heal' | 'avenge';
  value: number;
};
type Args = ArgsWithoutValue | ArgsWithValue;

const calculatorsDictionary = {
  attack: (target: IPet, value: number) =>
    -1 * value * (10 - target.attributes.friendliness) * (1 / 2),
  heal: (target: IPet, value: number) =>
    value * target.attributes.friendliness * (1 / 3),
  bully: (target: IPet, value: number) =>
    -1 * value * (10 - target.attributes.friendliness) * (1 / 6),
  caress: (target: IPet, value: number) =>
    value * target.attributes.friendliness * (1 / 9),
  avenge: (target: IPet, value: number) =>
    value * (10 - target.attributes.friendliness) * (1 / 8),
  join: (target: IPet) => target.attributes.friendliness * (1 / 5),
  share: (target: IPet) => target.attributes.friendliness * (1 / 6),
  steal: (target: IPet) => -1 * (10 - target.attributes.friendliness) * (1 / 6),
};

const changeRelation = (args: Args) => {
  if ('value' in args) {
    return calculatorsDictionary[args.type](args.target, args.value);
  }
  return calculatorsDictionary[args.type](args.target);
};

export { changeRelation };
