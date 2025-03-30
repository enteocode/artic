import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginRequest {
    @ApiProperty({ example: 'user@email.com' })
    @IsEmail({ allow_display_name: false, allow_utf8_local_part: false })
    username: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    password: string;
}
