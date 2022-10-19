import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SecurityPasswordService } from '../security/security.password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly manager: EntityManager,
    private readonly user: UserService,
    private readonly password: SecurityPasswordService
  ) {}

  async getUserAuthenticated(username: string, password: string): Promise<User> {
    if (!password) {
      throw new ConflictException('Invalid password');
    }
    const user = await this.user.getByUsername(username);
    const pass = await this.password.compare(password, user.password);

    if (!pass) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
