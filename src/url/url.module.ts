import { Module } from '@nestjs/common';
import { UrlService } from './url.service';

@Module({
  exports: [UrlService],
  providers: [UrlService]
})
export class UrlModule {}
