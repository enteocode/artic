import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { CACHE_INSTANCE } from './cache.constants';

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(@Inject(CACHE_INSTANCE) private readonly cache: Cacheable) {}

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
}
