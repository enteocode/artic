import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { DisableAuthentication } from '../auth/auth.disable-authentication.decorator';

@DisableAuthentication()
@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
        private readonly service: HealthService
    ) {}

    @HealthCheck()
    @Get()
    public check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.service.pingCache('cache')
        ])
    }
}
