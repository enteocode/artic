import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { FavoriteAddRequest } from './favorite.add.request';
import { Token } from '../auth/auth.token.decorator';
import { TokenPayload } from '../auth/auth.token.payload';

@ApiTags('Favorites')
@ApiBearerAuth()
@Controller('favorites')
export class FavoriteController {
    constructor(private readonly favorite: FavoriteService) {}

    @ApiOperation({ summary: 'Add an artwork to saved favorites' })
    @ApiBody({
        type: FavoriteAddRequest,
        required: true
    })
    @Post()
    public add(@Token() token: TokenPayload, @Body() request: FavoriteAddRequest): Promise<number> {
        return this.favorite.add(token.user, request.artwork);
    }

    @ApiOperation({ summary: 'Get all saved artworks' })
    @Get()
    public getAll(@Token() token: TokenPayload): Promise<number[]> {
        return this.favorite.get(token.user);
    }

    @ApiOperation({ summary: 'Get all saved artworks' })
    @Delete(':id')
    public remove(@Token() token: TokenPayload, @Param('id', ParseIntPipe) artwork: number): Promise<boolean> {
        return this.favorite.remove(token.user, artwork);
    }
}
