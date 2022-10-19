import { DisableAuthentication } from './auth.disable-authentication.decorator';
import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './auth.login.request';
import { Handler, TokenHandler } from './auth.token.handler.decorator';

@DisableAuthentication()
@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: AuthLoginRequest, @TokenHandler() setToken: Handler) {
    const user = await this.service.getUserAuthenticated(username, password);

    return setToken({
      user: user.id,
      name: user.username
    });
  }

  @Get('logout')
  async logout() {
    // AuthTokenInterceptor clears out COOKIE on HTTP 401 errors automatically
    // and frontend could redirect to login page on this response

    throw new UnauthorizedException();
  }

}
