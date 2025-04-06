import { Injectable, Logger } from '@nestjs/common';
import { TokenPayload } from './token.payload';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest as Request } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { UuidService } from '../uuid/uuid.service';

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);

    constructor(
        private readonly config: ConfigService<EnvironmentVariables>,
        private readonly jwt: JwtService,
        private readonly uuid: UuidService
    ) {}

    public getToken(request: Request, cookieName: string = this.config.get('AUTH_COOKIE')): Promise<TokenPayload> {
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

    public async verify(token: string): Promise<TokenPayload> {
        try {
            const { sub, jti } = await this.jwt.verifyAsync(token);

            return {
                uuid: jti,
                user: sub
            };
        } catch (e) {
            this.logger.error(e.message);
            return null;
        }
    }

    public sign({ uuid, user }: TokenPayload): string {
        return this.jwt.sign({}, { subject: user, jwtid: uuid || this.uuid.create() });
    }
}
