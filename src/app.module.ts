import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { EnvironmentVariables } from './env/environment.variables';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { AuthTokenInterceptor } from './auth/auth.token.interceptor';
import { ArtworkModule } from './artwork/artwork.module';
import { FavoriteModule } from './favorite/favorite.module';
import { Favorite } from './favorite/favorite.entity';

import { validate } from './env/environment.validation';

import store from 'cache-manager-ioredis';

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
        entities: [
          User,
          Favorite
        ],
        retryAttempts: 3
      })
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables>) => {
        // Redis does not supports TLS connections by default, but AWS requires

        const tls = config.get('REDIS_TLS') ? {} : null;

        return {
          store: store as any,
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          tls,
          max: 100,
          ttl: 86400
        };
      }
    }),
    AuthModule,
    ArtworkModule,
    FavoriteModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthTokenInterceptor
    }
  ]
})
export class AppModule implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    await this.connection.runMigrations({ transaction: 'each' });
  }
}
