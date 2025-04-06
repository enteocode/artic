import { Module, OnModuleInit } from '@nestjs/common';
import { APP_INTERCEPTOR, DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from '../security/security.module';
import { UserModule } from '../user/user.module';
import { AuthRegistryService } from './auth.registry.service';
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
        AuthTokenService,
        AuthRegistryService
    ]
})
export class AuthModule implements OnModuleInit {
    constructor(
        private readonly registry: AuthRegistryService,
        private readonly discovery: DiscoveryService
    ) {}

    onModuleInit() {
        const controllers = this.discovery.getControllers();

        controllers.forEach(({ instance, metatype }) => {
            const meta = Reflect.getMetadata(SYMBOL_AUTH_DISABLED, metatype);

            if (!meta) {
                return;
            }
            this.registry.register(instance.constructor);
        });
    }
}
