import React from 'react';
import type { ActAction, ResponseAction, InteractionAction } from 'redux/types';
import { isAct } from 'redux/actions/acts';
import { isResponse } from 'redux/actions/responses';
import { isInteraction } from 'redux/actions/interactions';
import { ActMessage } from './ActMessage';
import { ResponseMessage } from './ResponseMessage';
import { InteractionMessage } from './InteractionMessage';

const Message: React.FC<ActAction | ResponseAction | InteractionAction> = (
  action
) => {
  if (isAct(action)) return <ActMessage {...action} />;
  if (isResponse(action)) return <ResponseMessage {...action} />;
  if (isInteraction(action)) return <InteractionMessage {...action} />;
  return <></>; // (parameter) action: never
};

export { Message };
