import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from './user.entity';
import { SecurityPasswordService } from '../security/security.password.service';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(private readonly password: SecurityPasswordService) {}

  listenTo() {
    return User;
  }

  async beforeInsert({ entity }: InsertEvent<User>) {
    entity.password = await this.password.encrypt(entity.password);
  }

  async beforeUpdate({ entity, updatedColumns }: UpdateEvent<User>) {
    const updated = updatedColumns.some(({ propertyName }) => propertyName === 'pass');

    if (!updated) {
      return;
    }
    entity.pass = await this.password.encrypt(entity.pass);
  }
}
