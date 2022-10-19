import { SetMetadata } from '@nestjs/common';
import { SYMBOL_TOKEN_DECORATOR } from './auth.constants';

export const DisableAuthentication = () => {
  return SetMetadata(SYMBOL_TOKEN_DECORATOR, true);
};
