import { Module, OnModuleInit } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { UuidModule } from '../uuid/uuid.module';
import { FavoriteController } from './favorite.controller';
import { DataSource } from 'typeorm';

import { CreateFavoriteTable1666336937431 } from './migrations/1666336937431-CreateFavoriteTable';

@Module({
    controllers: [FavoriteController],
    imports: [UuidModule],
    providers: [FavoriteService]
})
export class FavoriteModule implements OnModuleInit {
    constructor(private readonly connection: DataSource) {}

    public onModuleInit(): void {
        this.connection.migrations.push(new CreateFavoriteTable1666336937431());
    }
}
