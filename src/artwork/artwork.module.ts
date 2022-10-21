import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UrlModule } from '../url/url.module';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';

@Module({
  controllers: [ArtworkController],
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 3 }), UrlModule],
  providers: [ArtworkService]
})
export class ArtworkModule {}
