import { Environment } from './environment.enum';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { IsHost } from '../url/url.host.validator';

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment = Environment.PRODUCTION;

    @IsOptional()
    @IsHost()
    SERVER_HOST: string = '0.0.0.0';

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    SERVER_PORT: number = 3030;

    @IsOptional()
    @IsUUID()
    UUID_NAMESPACE: string = '4296c584-fc14-4040-9ce5-98bb0f091550';

    @IsString()
    @MinLength(32)
    AUTH_SECRET: string;

    @IsOptional()
    @IsString()
    AUTH_ISSUER: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    AUTH_EXPIRE: number = 300;

    @IsOptional()
    @IsString()
    AUTH_COOKIE: string = '';

    @IsHost()
    MYSQL_HOST: string;

    @IsInt()
    @Type(() => Number)
    MYSQL_PORT: number;

    @IsString()
    MYSQL_USER: string;

    @IsString()
    MYSQL_PASSWORD: string;

    @IsString()
    MYSQL_DATABASE: string;

    @IsHost()
    REDIS_HOST: string;

    @IsInt()
    @Type(() => Number)
    REDIS_PORT: number;

    @IsOptional()
    @Type(() => Boolean)
    REDIS_TLS: boolean = false;
}
