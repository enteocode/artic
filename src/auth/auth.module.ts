import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { UserModule } from '../user/user.module';
import { AuthTokenService } from './auth.token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UuidModule } from '../uuid/uuid.module';
import { CacheModule } from '../cache/cache.module';
import { AuthTokenInterceptor } from './auth.token.interceptor';
import { SYMBOL_AUTH_DISABLED } from './auth.constants';

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService<EnvironmentVariables>) => ({
                secret: config.get('AUTH_SECRET'),
                signOptions: {
                    algorithm: 'HS256',
                    issuer: config.get('AUTH_ISSUER'),
                    expiresIn: config.get('AUTH_EXPIRE')
                }
            })
        }),
        ConfigModule,
        CacheModule,
        DiscoveryModule,
        UuidModule,
        UserModule,
        SecurityModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: AuthTokenInterceptor
        },
        AuthService,
        AuthTokenService
    ]
})
export class AuthModule {}
