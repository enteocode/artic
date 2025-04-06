import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    UnauthorizedException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { catchError, tap } from 'rxjs/operators';
import { SYMBOL_AUTH_DISABLED, SYMBOL_TOKEN } from './auth.constants';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
    private readonly logger = new Logger(AuthTokenInterceptor.name);

    constructor(
        private readonly reflector: Reflector,
        private readonly config: ConfigService<EnvironmentVariables>,
        private readonly token: AuthTokenService,
    ) {}

    public async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const handler = context.switchToHttp();
        const req = handler.getRequest<Request>();
        const res = handler.getResponse<Response>();
        const controller = context.getClass();

        // Trying to get the Token from Authorization header or COOKIE

        const cookie = this.config.get<string>('AUTH_COOKIE');
        const disabled = this.reflector.getAllAndOverride(SYMBOL_AUTH_DISABLED, [context.getHandler(), controller]);
        const token = await this.token.getToken(req, cookie);

        if (!disabled) {
            if (!token) {
                throw new UnauthorizedException('Unauthorized request');
            }
            if (token && req.cookies[cookie]) {
                req.headers.authorization = `Bearer ${req.cookies[cookie]}`;
            }
        }
        // Enhancing the response object with the token to let it retrieve
        // by the decorator

        Reflect.defineMetadata(SYMBOL_TOKEN, token, res);

        return next
            .handle()
            .pipe(
                catchError((error) => {
                    if (error instanceof UnauthorizedException) {
                        res.clearCookie(cookie);
                    }
                    return throwError(() => error);
                })
            )
            .pipe(
                tap(() => {
                    if (res.sent) {
                        const type = controller.name;
                        const call = context.getHandler().name;

                        this.logger.error(
                            `Cannot set Token to the Response on ${type}.${call} as headers was already sent`
                        );

                        return;
                    }
                    const token = Reflect.getMetadata(SYMBOL_TOKEN, res);

                    if (!token) {
                        return;
                    }
                    const signed = this.token.sign(token);
                    const expire = this.config.get<number>('AUTH_EXPIRE');

                    // Sending back the token for stateless requests

                    res.header('X-Token', signed);

                    // Setting the permanent token (if permitted)

                    if (!cookie) {
                        return;
                    }
                    res.cookie(cookie, signed, {
                        secure: this.isSecure(req),
                        httpOnly: true,
                        path: '/',
                        expires: new Date(expire * 1000 + Date.now()),
                        sameSite: 'strict'
                    });
                })
            );
    }

    private isSecure(request: Request): boolean {
        return request.protocol === 'https' || request.headers['x-forwarded-proto'] === 'https';
    }
}
