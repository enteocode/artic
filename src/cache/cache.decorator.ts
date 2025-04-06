import { SetMetadata } from '@nestjs/common';
import { CACHE_DECORATOR, CACHE_TTL_DYNAMIC } from './cache.constants';

/**
 * Flags the given entrypoint to be cached based on Token and URL
 *
 * @public
 * @param ttl
 * @constructor
 */
export const Cache = (ttl: number = CACHE_TTL_DYNAMIC) => {
    return SetMetadata(CACHE_DECORATOR, ttl);
};
