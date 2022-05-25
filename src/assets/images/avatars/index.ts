import chameleon from './chameleon.png';
import cobra from './cobra.png';
import deer from './deer.png';
import eagle from './eagle.png';
import fox from './fox.png';
import hedgehog from './hedgehog.png';
import lion from './lion.png';
import platypus from './platypus.png';
import sloth from './sloth.png';
import walrus from './walrus.png';

const avatars = {
  chameleon,
  cobra,
  deer,
  eagle,
  fox,
  hedgehog,
  lion,
  platypus,
  sloth,
  walrus,
};

type Avatar = keyof typeof avatars;

export type { Avatar };
export { avatars };
export {
  chameleon,
  cobra,
  deer,
  eagle,
  fox,
  hedgehog,
  lion,
  platypus,
  sloth,
  walrus,
};
