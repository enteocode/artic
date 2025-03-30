import { TokenPayload } from './auth.token.payload';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponse implements TokenPayload {
    @ApiProperty({ description: 'Identifier' })
    user: string;
}
