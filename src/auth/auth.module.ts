import { Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from '../security/security.module';
import { UserModule } from '../user/user.module';
import { AuthRegistryService } from './auth.registry.service';
import { AuthTokenService } from './auth.token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUserService } from './auth.user.service';
import { UuidModule } from '../uuid/uuid.module';
import { UuidService } from '../uuid/uuid.service';
import { SYMBOL_AUTH_DISABLED } from './auth.constants';

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule, UuidModule],
            inject: [ConfigService, UuidService],
            useFactory: (config: ConfigService<EnvironmentVariables>, uuid: UuidService) => ({
                secret: config.get('AUTH_SECRET'),
                signOptions: {
                    algorithm: 'HS256',
                    issuer: config.get('AUTH_ISSUER'),
                    expiresIn: config.get('AUTH_EXPIRE'),

                    // A unique identifier for all key is important due to blacklisting
                    // between the nodes

                    keyid: uuid.create()
                }
            })
        }),
        ConfigModule,
        DiscoveryModule,
        UserModule,
        SecurityModule
    ],
    exports: [AuthService, AuthTokenService, AuthRegistryService, AuthUserService],
    providers: [AuthService, AuthTokenService, AuthRegistryService, AuthUserService]
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
