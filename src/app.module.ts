import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EnvironmentVariables } from './env/environment.variables';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { ArtworkModule } from './artwork/artwork.module';
import { FavoriteModule } from './favorite/favorite.module';
import { Favorite } from './favorite/favorite.entity';
import { HealthModule } from './health/health.module';
import { CacheModule } from './cache/cache.module';

import { validate } from './env/environment.validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate,
            cache: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService<EnvironmentVariables>) => ({
                type: 'mysql',
                host: config.get('MYSQL_HOST'),
                port: config.get('MYSQL_PORT'),
                username: config.get('MYSQL_USER'),
                password: config.get('MYSQL_PASSWORD'),
                database: config.get('MYSQL_DATABASE'),
                entities: [User, Favorite],
                retryAttempts: 3
            })
        }),
        HealthModule,
        AuthModule,
        ArtworkModule,
        FavoriteModule,
        CacheModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        }
    ]
})
export class AppModule implements OnModuleInit {
    constructor(private readonly connection: DataSource) {}

    async onModuleInit() {
        await this.connection.runMigrations({ transaction: 'each' });
    }
}
