import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';
import { TokenPayload } from '../token/token.payload';
import { SYMBOL_TOKEN } from './auth.constants';

/**
 * Retrieves the token instance from the Response reference
 */
export const Token = createParamDecorator((data: unknown, context: ExecutionContext): TokenPayload => {
    const response = context.switchToHttp().getResponse<Response>();
    const internal = Reflect.getMetadata(SYMBOL_TOKEN, response);

    if (!internal) {
        return null;
    }
    return internal;
});
