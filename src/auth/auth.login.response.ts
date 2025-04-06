import { TokenPayload } from '../token/token.payload';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponse implements TokenPayload {
    @ApiProperty({ description: 'Identifier' })
    user: string;
}
