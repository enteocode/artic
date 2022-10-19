import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { TokenPayload } from './auth.token.payload';
import { LOCALS_PAYLOAD } from './auth.constants';

export const Token = createParamDecorator((data: unknown, context: ExecutionContext): TokenPayload => {
  const response = context.switchToHttp().getResponse<Response>();
  const internal = response.locals[LOCALS_PAYLOAD];

  if (!internal) {
    return null;
  }
  return internal;
});
