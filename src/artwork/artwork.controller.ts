import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkResponse } from './artwork.response';
import { ArtworkInterface } from './artwork.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cache } from '../cache/cache.decorator';

@ApiTags('Artworks')
@ApiBearerAuth()
@Controller('artworks')
@Cache()
export class ArtworkController {
    constructor(private readonly artwork: ArtworkService) {}

    @ApiOperation({ summary: 'Get an artwork with the specified identifier' })
    @ApiResponse({ type: ArtworkResponse })
    @Get(':id')
    public get(@Param('id', ParseIntPipe) id: number): Promise<ArtworkInterface> {
        return this.artwork.get(id);
    }

    @ApiOperation({ summary: 'Get all artworks' })
    @ApiResponse({ type: ArtworkResponse, isArray: true })
    @Get()
    public getAll(
        @Query('take', ParseIntPipe) take: number = 50,
        @Query('page', ParseIntPipe) page: number = 1
    ): Promise<ArtworkInterface[]> {
        return this.artwork.getAll(take, page);
    }
}
