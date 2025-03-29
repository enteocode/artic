import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ArtworkCollectionQuery {
    @IsOptional()
    @IsInt()
    @Transform(() => Number)
    limit = 50;

    @IsOptional()
    @IsInt()
    @Transform(() => Number)
    page = 1;
}
