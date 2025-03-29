import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteCreateRequest } from './favorite.create.request';
import { Token } from '../auth/auth.token.decorator';
import { TokenPayload } from '../auth/auth.token.payload';
import { AuthUserService } from '../auth/auth.user.service';

@Controller('favorites')
export class FavoriteController {
    constructor(
        private readonly favorite: FavoriteService,
        private readonly user: AuthUserService
    ) {}

    @Post()
    create(@Token() token: TokenPayload, @Body() request: FavoriteCreateRequest) {
        return this.favorite.add(this.user.getUserByToken(token), request.artwork);
    }

    @Get()
    getAll(@Token() token: TokenPayload) {
        return this.favorite.get(this.user.getUserByToken(token));
    }

    @Delete(':id')
    async remove(@Token() token: TokenPayload, @Param('id', ParseIntPipe) id: number) {
        const user = this.user.getUserByToken(token);
        const success = await this.favorite.remove(user, id);

        if (!success) {
            throw new NotFoundException(`Favorite#${id} does not exists in your collection`);
        }
    }
}
