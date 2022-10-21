import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FavoriteCreateRequest {
  @IsInt()
  @Type(() => Number)
  artwork: number;
}
