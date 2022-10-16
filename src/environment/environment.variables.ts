import { Environment } from './environment.enum';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsHost } from '../url/url.host.validator';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.PRODUCTION;

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
