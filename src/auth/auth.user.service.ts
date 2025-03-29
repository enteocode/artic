import { TokenPayload } from './auth.token.payload';
import { UserInterface } from '../user/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUserService {
    getUserByToken(token: TokenPayload): UserInterface {
        return { id: token.user } as UserInterface;
    }
}
