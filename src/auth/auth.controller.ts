import { DisableAuthentication } from './auth.disable-authentication.decorator';
import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './auth.login.request';
import { Authorizer, TokenAuthorizer } from './auth.token.authorizer.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthTokenService } from './auth.token.service';
import { AuthLoginResponse } from './auth.login.response';
import { Token } from './auth.token.decorator';
import { TokenPayload } from './auth.token.payload';

@DisableAuthentication()
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly token: AuthTokenService
    ) {}

    @ApiOperation({ summary: 'Authorization' })
    @ApiBody({ type: AuthLoginRequest })
    @ApiResponse({ type: AuthLoginResponse })
    @Post('login')
    public async login(
        @Body() { username, password }: AuthLoginRequest,
        @TokenAuthorizer() authorize: Authorizer
    ): Promise<AuthLoginResponse> {
        const user = await this.service.getUserAuthenticated(username, password);

        return authorize({
            user: user.id
        });
    }

    @Get('logout')
    public async logout(@Token() token: TokenPayload) {
        await this.token.invalidate(token);

        // AuthTokenInterceptor clears out COOKIE on HTTP 401 errors automatically
        // and frontend could redirect to login page on this response

        throw new UnauthorizedException();
    }
}
