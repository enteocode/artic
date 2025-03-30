import { ArtworkInterface } from './artwork.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ArtworkResponse implements ArtworkInterface {
    @ApiProperty()
    title: string;

    @ApiProperty()
    id: number;

    @ApiProperty({ type: 'string', isArray: true })
    artist_titles: string[];
}
