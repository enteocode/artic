import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth.token.service';
import { CacheModule } from '../cache/cache.module';
import { AuthTokenInterceptor } from './auth.token.interceptor';
import { TokenModule } from '../token/token.module';

@Module({
    controllers: [AuthController],
    imports: [TokenModule, CacheModule, UserModule, SecurityModule],
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
