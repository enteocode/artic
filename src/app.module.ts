import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { EnvironmentVariables } from './env/environment.variables';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { AuthTokenInterceptor } from './auth/auth.token.interceptor';
import { ArtworkModule } from './artwork/artwork.module';

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
        entities: [
          User
        ],
        retryAttempts: 3
      })
    }),
    AuthModule,
    ArtworkModule
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
