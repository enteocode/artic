import { Controller, Get, Header, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ArtworkService } from './artwork.service';
import { ArtworkCollectionQuery } from './artwork.collection.query';
import { Observable } from 'rxjs';
import { ArtworkInterface } from './artwork.interface';

@UseInterceptors(CacheInterceptor)
@Controller('artworks')
export class ArtworkController {
    constructor(private readonly artwork: ArtworkService) {}

    @Get(':id')
    @Header('Cache-Control', 'max-age=3600')
    public get(@Param('id', ParseIntPipe) id: number): Observable<ArtworkInterface> {
        return this.artwork.get(id);
    }

    @Get()
    @Header('Cache-Control', 'max-age=3600')
    public getAll(@Query() { limit, page }: ArtworkCollectionQuery): Observable<ArtworkInterface[]> {
        return this.artwork.getAll(limit, page);
    }
}
