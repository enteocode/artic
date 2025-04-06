import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { UuidModule } from '../uuid/uuid.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService<EnvironmentVariables>) => ({
                secret: config.get('AUTH_SECRET'),
                signOptions: {
                    algorithm: 'HS256',
                    issuer: config.get<string>('AUTH_ISSUER'),
                    expiresIn: config.get<number>('AUTH_EXPIRE')
                }
            })
        }),
        ConfigModule,
        UuidModule
    ],
    exports: [TokenService],
    providers: [TokenService]
})
export class TokenModule {}
