import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';
import { TokenPayload } from './auth.token.payload';
import { SYMBOL_TOKEN } from './auth.constants';

export const Token = createParamDecorator((data: unknown, context: ExecutionContext): TokenPayload => {
    const response = context.switchToHttp().getResponse<Response>();
    const internal = Reflect.getMetadata(SYMBOL_TOKEN, response);

    if (!internal) {
        return null;
    }
    return internal;
});
