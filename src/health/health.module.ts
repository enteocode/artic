import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { HealthService } from './health.service';

@Module({
    controllers: [HealthController],
    imports: [TerminusModule, TypeOrmModule, CacheModule],
    providers: [HealthService]
})
export class HealthModule {}
