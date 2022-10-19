import { Module } from '@nestjs/common';
import { SecurityPasswordService } from './security.password.service';

@Module({
  exports: [SecurityPasswordService],
  providers: [SecurityPasswordService]
})
export class SecurityModule {}
