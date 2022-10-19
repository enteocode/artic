import { Environment } from './environment.enum';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { IsHost } from '../url/url.host.validator';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.PRODUCTION;

  @IsOptional()
  @IsUUID()
  UUID_NAMESPACE = '4296c584-fc14-4040-9ce5-98bb0f091550';

  @IsString()
  @MinLength(32)
  AUTH_SECRET;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  AUTH_EXPIRE = 300;

  @IsOptional()
  @IsString()
  AUTH_COOKIE = '';

  @IsHost()
  MYSQL_HOST;

  @IsInt()
  @Type(() => Number)
  MYSQL_PORT;

  @IsString()
  MYSQL_USER;

  @IsString()
  MYSQL_PASSWORD;

  @IsString()
  MYSQL_DATABASE;
}
