import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';
import { DisableAuthentication } from '../auth/auth.disable-authentication.decorator';

@DisableAuthentication()
@Controller('health')
@ApiTags('Health Check')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
        private readonly service: HealthService
    ) {}

    @HealthCheck()
    @Get()
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.service.pingCache('cache')
        ])
    public check(): Promise<HealthCheckResult> {
    }
}
