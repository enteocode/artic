import { CacheService } from '../cache/cache.service';
import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(
        private readonly indicator: HealthIndicatorService,
        private readonly cache: CacheService
    ) {}

    /**
     * Checks the connection of the cache service
     *
     * @public
     * @param key
     */
    public async pingCache(key: string = 'cache'): Promise<HealthIndicatorResult> {
        const indicator = this.indicator.check(key);
        const connected = await this.cache.isConnected();

        if (connected) {
            return indicator.up();
        }
        return indicator.down();
    }
}
