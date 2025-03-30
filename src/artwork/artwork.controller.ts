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
    public get(@Param('id', ParseIntPipe) id: number): Promise<ArtworkInterface> {
        return this.artwork.get(id);
    }

    @Get()
    @Header('Cache-Control', 'max-age=3600')
    public getAll(
        @Query('take', ParseIntPipe) take: number = 50,
        @Query('page', ParseIntPipe) page: number = 1
    ): Promise<ArtworkInterface[]> {
        return this.artwork.getAll(take, page);
    }
}
