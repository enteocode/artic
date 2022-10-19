import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './auth.token.payload';
import { Request } from 'express';

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwt: JwtService) {}

  private async verify(token: string): Promise<TokenPayload> {
    try {
      const { name, sub } = await this.jwt.verifyAsync(token);

      return {
        user: sub,
        name
      };
    } catch (e) {
      return null;
    }
  }

  getToken(request: Request, cookieName: string = ''): Promise<TokenPayload> {
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

  sign({ user, name }: TokenPayload): string {
    return this.jwt.sign({ name }, { subject: user });
  }
}
