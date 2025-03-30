import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest as Request } from 'fastify';
import { UuidService } from '../uuid/uuid.service';
import { Uuid } from '../uuid/uuid.type';
import { Keyv } from '@keyv/redis';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { TokenPayload } from './auth.token.payload';
import { CACHE_INSTANCE } from '../cache/cache.constants';

@Injectable()
export class AuthTokenService {
    constructor(
        @Inject(CACHE_INSTANCE) private readonly cache: Keyv,
        private readonly config: ConfigService<EnvironmentVariables>,
        private readonly jwt: JwtService,
        private readonly uuid: UuidService
    ) {}

    private async verify(token: string): Promise<TokenPayload> {
        try {
            const { sub, jti } = await this.jwt.verifyAsync(token);

            // Signature was valid, check the blacklist

            const isBlacklisted = await this.cache.has(this.getCacheKey(jti));

            if (isBlacklisted) {
                return null;
            }
            return {
                uuid: jti,
                user: sub
            };
        } catch (e) {
            return null;
        }
    }

    private getCacheKey(id: Uuid): string {
        return `blacklist:token:${id}`;
    }

    public getToken(request: Request, cookieName = ''): Promise<TokenPayload> {
        const header = request.headers.authorization;
        const cookie = request.cookies;

        if (header && header.substring(0, 6) === 'Bearer') {
            return this.verify(header.substring(7));
        }
        if (cookie && cookieName) {
            return this.verify(cookie[cookieName]);
        }
        return null;
    }

    public sign({ user }: TokenPayload): string {
        return this.jwt.sign({}, { subject: user, jwtid: this.uuid.create() });
    }

    public async invalidate({ uuid }: TokenPayload) {
        await this.cache.set(this.getCacheKey(uuid), true, 1000 * this.config.get<number>('AUTH_EXPIRE'));
    }
}
