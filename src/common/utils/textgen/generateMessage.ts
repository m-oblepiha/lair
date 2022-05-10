import type {
  MessageSeed,
  ActMessageSeed,
  ResponseMessageSeed,
  EffectMessageSeed,
} from 'common/types/message';

const generateActMessage = ({ action }: ActMessageSeed) => {
  return action.toString();
};

const generateResponseMessage = ({ action }: ResponseMessageSeed) => {
  const { actor, act } = action;
  return `${actor.name} -> ${act.target?.name ?? 'self'}: ${action.type} ${
    'value' in action && action.value
  }`;
};

const generateEffectMessage = ({ action }: EffectMessageSeed) => {
  return `${action.target?.name} <- ${action.type}`;
};

const generateMessage = (seed: MessageSeed) => {
  switch (seed.type) {
    case 'act':
      return generateActMessage(seed);
    case 'response':
      return generateResponseMessage(seed);
    case 'effect':
      return generateEffectMessage(seed);
  }
};

export { generateMessage };
