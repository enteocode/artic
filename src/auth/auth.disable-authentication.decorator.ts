import { SetMetadata } from '@nestjs/common';
import { SYMBOL_AUTH_DISABLED } from './auth.constants';

export const DisableAuthentication = () => {
    return SetMetadata(SYMBOL_AUTH_DISABLED, true);
};
