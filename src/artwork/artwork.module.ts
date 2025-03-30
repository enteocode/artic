import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { CacheModule } from '../cache/cache.module';

@Module({
    controllers: [ArtworkController],
    imports: [
        HttpModule.register({
            baseURL: 'https://api.artic.edu/api/v1/artworks',
            timeout: 5000,
            maxRedirects: 3
        }),
        CacheModule
    ],
    providers: [ArtworkService]
})
export class ArtworkModule {}
