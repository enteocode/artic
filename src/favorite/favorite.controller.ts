import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteAddRequest } from './favorite.add.request';
import { Token } from '../auth/auth.token.decorator';
import { TokenPayload } from '../auth/auth.token.payload';

@Controller('favorites')
export class FavoriteController {
    constructor(private readonly favorite: FavoriteService) {}

    @Post()
    public add(@Token() token: TokenPayload, @Body() request: FavoriteAddRequest): Promise<number> {
        return this.favorite.add(token.user, request.artwork);
    }

    @Get()
    public getAll(@Token() token: TokenPayload): Promise<number[]> {
        return this.favorite.get(token.user);
    }

    @Delete(':id')
    public remove(@Token() token: TokenPayload, @Param('id', ParseIntPipe) artwork: number): Promise<boolean> {
        return this.favorite.remove(token.user, artwork);
    }
}
