import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { TokenPayload } from './auth.token.payload';
import { LOCALS_PAYLOAD } from './auth.constants';

export type Handler = (token: TokenPayload) => TokenPayload;

// ATTENTION
//
// If you decorate the controller entry-point with @Res(), then the internal
// behaviour of NestJS changes, so you'd have to send the Response manually.
//
// As we are setting a COOKIE in the interceptor, sent headers are causing a
// problem.

export const TokenHandler = createParamDecorator((data: unknown, context: ExecutionContext): Handler => {
  const response = context.switchToHttp().getResponse<Response>();

  return (token: TokenPayload) => {
    response.locals[LOCALS_PAYLOAD] = token;

    return token;
  };
});
