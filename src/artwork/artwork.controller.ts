import { Controller, Get, Header, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkResponse } from './artwork.response';
import { ArtworkInterface } from './artwork.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Artworks')
@ApiBearerAuth()
@Controller('artworks')
export class ArtworkController {
    constructor(private readonly artwork: ArtworkService) {}

    @ApiOperation({ summary: 'Get an artwork with the specified identifier' })
    @ApiResponse({ type: ArtworkResponse })
    @Get(':id')
    @Header('Cache-Control', 'max-age=3600')
    public get(@Param('id', ParseIntPipe) id: number): Promise<ArtworkInterface> {
        return this.artwork.get(id);
    }

    @ApiOperation({ summary: 'Get all artworks' })
    @ApiResponse({ type: ArtworkResponse, isArray: true })
    @Get()
    @Header('Cache-Control', 'max-age=3600')
    public getAll(
        @Query('take', ParseIntPipe) take: number = 50,
        @Query('page', ParseIntPipe) page: number = 1
    ): Promise<ArtworkInterface[]> {
        return this.artwork.getAll(take, page);
    }
}
