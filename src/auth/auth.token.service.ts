import { Inject, Injectable } from '@nestjs/common';
import { Uuid } from '../uuid/uuid.type';
import { Keyv } from '@keyv/redis';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { TokenPayload } from '../token/token.payload';
import { TokenService } from '../token/token.service';
import { CACHE_INSTANCE } from '../cache/cache.constants';

@Injectable()
export class AuthTokenService {
    constructor(
        @Inject(CACHE_INSTANCE) private readonly cache: Keyv,
        private readonly config: ConfigService<EnvironmentVariables>,
        private readonly token: TokenService
    ) {}

    private async verify(token: string): Promise<TokenPayload> {
        const verified = await this.token.verify(token);

        if (verified) {
            // Signature was valid, check the blacklist

            const isBlacklisted = await this.cache.has(this.getCacheKey(verified.uuid));

            if (isBlacklisted) {
                return null;
            }
        }
        return verified;
    }

    private getCacheKey(id: Uuid): string {
        return `blacklist:token:${id}`;
    }

    public async invalidate({ uuid }: TokenPayload) {
        await this.cache.set(this.getCacheKey(uuid), true, 1000 * this.config.get<number>('AUTH_EXPIRE'));
    }
}
