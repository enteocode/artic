import { CacheInterceptor, Controller, Get, Header, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkCollectionQuery } from './artwork.collection.query';

@Controller('artworks')
@UseInterceptors(CacheInterceptor)
export class ArtworkController {
  constructor(private readonly artwork: ArtworkService) {}

  @Get(':id')
  @Header('Cache-Control', 'max-age=3600')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.artwork.get(id);
  }

  @Get()
  @Header('Cache-Control', 'max-age=3600')
  async getAll(@Query() { limit, page }: ArtworkCollectionQuery) {
    return this.artwork.getAll(limit, page);
  }
}
