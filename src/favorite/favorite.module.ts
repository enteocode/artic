import { Module, OnModuleInit } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { UuidModule } from '../uuid/uuid.module';
import { AuthModule } from '../auth/auth.module';
import { FavoriteController } from './favorite.controller';
import { Connection } from 'typeorm';

import { CreateFavoriteTable1666336937431 } from './migrations/1666336937431-CreateFavoriteTable';

@Module({
  controllers: [FavoriteController],
  imports: [UuidModule, AuthModule],
  exports: [FavoriteService],
  providers: [FavoriteService]
})
export class FavoriteModule implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.migrations.push(new CreateFavoriteTable1666336937431());
  }
}
