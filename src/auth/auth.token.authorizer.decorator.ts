import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';
import { TokenPayload } from './auth.token.payload';
import { SYMBOL_TOKEN } from './auth.constants';

export type Authorizer = (token: TokenPayload) => TokenPayload;

// ATTENTION
//
// If you decorate the controller entry-point with @Res(), then the internal
// behaviour of NestJS changes, so you'd have to send the Response manually.
//
// As we are setting a COOKIE in the interceptor, sent headers are causing a
// problem.

export const TokenAuthorizer = createParamDecorator((data: unknown, context: ExecutionContext): Authorizer => {
    const response = context.switchToHttp().getResponse<Response>();

    return (token: TokenPayload) => {
        Reflect.defineMetadata(SYMBOL_TOKEN, token, response);

        return token;
    };
});
