import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteAddRequest {
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    artwork: number;
}
