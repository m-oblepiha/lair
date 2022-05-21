const avatars = [
  'chameleon',
  'cobra',
  'deer',
  'eagle',
  'fox',
  'hedgehog',
  'lion',
  'platypus',
  'sloth',
  'walrus',
] as const;

type Avatar = typeof avatars[number];

export type { Avatar };
export { avatars };
