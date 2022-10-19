import { Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { Connection } from 'typeorm';
import { SecurityPasswordService } from '../security/security.password.service';
import { UserSubscriber } from './user.subscriber';
import { UuidModule } from '../uuid/uuid.module';
import { SecurityModule } from '../security/security.module';

import { CreateUserTable1665948781134 } from './migrations/1665948781134-CreateUserTable';
import { CreateUsers1665949564977 } from './migrations/1665949564977-CreateUsers';

@Module({
  imports: [UuidModule, SecurityModule],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule implements OnModuleInit {
  constructor(
    private readonly connection: Connection,
    private readonly user: UserService,
    private readonly password: SecurityPasswordService
  ) {}

  onModuleInit() {
    this.connection.subscribers.push(new UserSubscriber(this.password));

    this.connection.migrations.push(
      new CreateUserTable1665948781134(),
      new CreateUsers1665949564977(this.user)
    );
  }
}
