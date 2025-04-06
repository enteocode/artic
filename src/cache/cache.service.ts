import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { HashService } from '../hash/hash.service';
import { CACHE_INSTANCE } from './cache.constants';

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(
        @Inject(CACHE_INSTANCE) private readonly cache: Cacheable,
        private readonly hash: HashService
    ) {}

    /**
     * Pings the Redis cache store to check its connection
     *
     * @public
     */
    public async isConnected(): Promise<boolean> {
        const { client } = this.cache.primary.store;

        try {
            await client.ping();
            return true;
        } catch (e) {
            this.logger.error(e);
            return false;
        }
    }

    /**
     * Hashes the given input with a 64-bit non-cryptographic algorithm
     *
     * @public
     * @param input
     */
    public createETag(input: string): string {
        return this.hash.create(input).toString('base64');
    }
}
