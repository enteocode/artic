import { IsEmail, IsString } from 'class-validator';

export class AuthLoginRequest {
    @IsEmail({ allow_display_name: false, allow_utf8_local_part: false })
    username: string;

    @IsString()
    password: string;
}
