import { SetMetadata } from '@nestjs/common';
import { SYMBOL_AUTH_DISABLED } from './auth.constants';

/**
 * Flags the given controller to avoid Token validation
 *
 * @public
 * @constructor
 */
export const DisableAuthentication = () => {
    return SetMetadata(SYMBOL_AUTH_DISABLED, true);
};
