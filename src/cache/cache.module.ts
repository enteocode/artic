import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { createKeyv } from '@keyv/redis';
import { TokenModule } from '../token/token.module';
import { HashModule } from '../hash/hash.module';
import { Cacheable } from 'cacheable';
import { CacheService } from './cache.service';
import { CacheInterceptor } from './cache.interceptor';
import { CACHE_INSTANCE } from './cache.constants';

@Module({
    imports: [ConfigModule, TokenModule, HashModule],
    exports: [CACHE_INSTANCE, CacheService],
    providers: [
        {
            provide: CACHE_INSTANCE,
            inject: [ConfigService],
            useFactory: async (config: ConfigService<EnvironmentVariables>) => {
                const cache = new Cacheable({
                    primary: createKeyv({
                        socket: {
                            host: config.get<string>('REDIS_HOST'),
                            port: config.get<number>('REDIS_PORT')
                        }
                    }),
                    ttl: '1h',
                    nonBlocking: true
                });
                // Client connects only at first interaction, causing issues with health-check
                // thus we have to connect manually at initialization

                await cache.primary.store.client.connect();

                return cache;
            }
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor
        },
        CacheService
    ]
})
export class CacheModule {}
