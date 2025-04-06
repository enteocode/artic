import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FastifyReply as Response, FastifyRequest as Request } from 'fastify';
import { CacheService } from './cache.service';
import { TokenService } from '../token/token.service';
import { CACHE_DECORATOR, CACHE_RECORD_SEPARATOR, CACHE_TTL_DYNAMIC } from './cache.constants';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        private readonly cache: CacheService,
        private readonly token: TokenService
    ) {}

    public async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const handler = context.switchToHttp();
        const req = handler.getRequest<Request>();
        const res = handler.getResponse<Response>();
        const cached = this.reflector.getAllAndOverride(CACHE_DECORATOR, [context.getClass(), context.getHandler()]);

        // Operative methods cannot be cached regardless of the instructions

        if (!cached || req.method !== 'GET') {
            return next.handle();
        }
        // If cache was defined with timeout (in seconds)

        if (cached !== CACHE_TTL_DYNAMIC) {
            res.header('Cache-Control', `max-age=${cached}`);
        }
        const token = await this.token.getToken(req);
        const prev = req.headers['if-none-match'];
        const refs = [req.url.toLowerCase(), token && token.uuid].filter(Boolean).join(CACHE_RECORD_SEPARATOR);
        const etag = this.cache.createETag(refs);

        res.header('ETag', etag);

        if (prev && prev === etag) {
            return of(null).pipe(
                tap(() => {
                    res.code(HttpStatus.NOT_MODIFIED);
                    res.send();
                })
            );
        }
        return next.handle();
    }
}
