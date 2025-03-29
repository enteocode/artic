import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    UnauthorizedException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { AuthTokenService } from './auth.token.service';
import { AuthRegistryService } from './auth.registry.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';
import { LOCALS_PAYLOAD } from './auth.constants';

import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
    private readonly logger = new Logger(AuthTokenInterceptor.name);

    constructor(
        private readonly config: ConfigService<EnvironmentVariables>,
        private readonly token: AuthTokenService,
        private readonly registry: AuthRegistryService
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const handler = context.switchToHttp();
        const req = handler.getRequest<Request>();
        const res = handler.getResponse<Response>();
        const controller = context.getClass();

        // Trying to get the Token from Authorization header or COOKIE

        const cookie = this.config.get('AUTH_COOKIE');
        const token = await this.token.getToken(req, cookie);

        if (!token && this.registry.isAuthenticationEnabled(controller)) {
            throw new UnauthorizedException('Invalid token');
        }
        // IMPORTANT
        //
        // Using the local/internal store of the Response to pass forward the
        // payload for token decorators. This could be changed by the controller
        // for example login or logout.
        //
        // Before sending the response, we are updating the COOKIE with the
        // refreshed token and the cycle continues.

        res.locals[LOCALS_PAYLOAD] = token;

        return next
            .handle()
            .pipe(
                catchError((e) => {
                    if (e instanceof UnauthorizedException) {
                        res.clearCookie(cookie);
                    }
                    return throwError(e);
                })
            )
            .pipe(
                tap(async () => {
                    if (res.headersSent) {
                        const type = controller.name;
                        const call = context.getHandler().name;

                        this.logger.error(
                            `Cannot set Token to the Response on ${type}.${call} as headers was already sent`
                        );

                        return;
                    }
                    const signed = this.token.sign(res.locals[LOCALS_PAYLOAD]);
                    const expire = this.config.get('AUTH_EXPIRE');

                    // Sending back the token for stateless requests

                    res.setHeader('X-Token', signed);

                    // Setting the token (if permitted)

                    if (!cookie) {
                        return;
                    }
                    res.cookie(cookie, signed, {
                        secure: this.isSecure(req),
                        httpOnly: true,
                        expires: new Date(expire * 1000 + Date.now()),
                        sameSite: 'strict'
                    });
                })
            );
    }

    private isSecure(request: Request): boolean {
        return request.secure || request.headers['x-forwarded-proto'] === 'https';
    }
}
