import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UrlModule } from '../url/url.module';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';

@Module({
    controllers: [ArtworkController],
    imports: [
        HttpModule.register({
            baseURL: 'https://api.artic.edu/api/v1/artworks',
            timeout: 5000,
            maxRedirects: 3
        })
    ],
    providers: [ArtworkService]
})
export class ArtworkModule {}
