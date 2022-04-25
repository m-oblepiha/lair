import type {
  MessageSeed,
  ActMessageSeed,
  ResponseMessageSeed,
  EffectMessageSeed,
} from 'common/types/message';

const generateActMessage = ({ action }: ActMessageSeed) => {
  return action.toString();
};

const generateEffectMessage = ({ action }: EffectMessageSeed) => {
  return `${action.target?.name} <- ${action.type}`;
};

const generateResponseMessage = ({ action }: ResponseMessageSeed) => {
  return `${action.actor.name} -> ${action.target?.name ?? 'self'}: ${
    action.type
  } ${action.value}`;
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
