import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { createKeyv } from '@keyv/redis';
import { Cacheable } from 'cacheable';
import { CACHE_INSTANCE } from './cache.constants';

@Module({
    imports: [ConfigModule],
    exports: [CACHE_INSTANCE],
    providers: [
        {
            provide: CACHE_INSTANCE,
            inject: [ConfigService],
            useFactory: (config: ConfigService<EnvironmentVariables>) => {
                return new Cacheable({
                    primary: createKeyv({
                        socket: {
                            host: config.get<string>('REDIS_HOST'),
                            port: config.get<number>('REDIS_PORT')
                        }
                    }),
                    ttl: '1h',
                    nonBlocking: true
                });
            }
        }
    ]
})
export class CacheModule {}
