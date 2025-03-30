import { Injectable, NotFoundException } from '@nestjs/common';
import { UuidService } from '../uuid/uuid.service';
import { UserInterface } from './user.interface';
import { User } from './user.entity';
import { Uuid } from '../uuid/uuid.type';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly manager: EntityManager,
        private readonly uuid: UuidService
    ) {}

    public create(username: string, password: string): UserInterface {
        // Username is a read-only field, thus we can generate the ID
        // to avoid extra selects in ORM on complex queries

        return {
            id: this.createId(username),
            username,
            password
        };
    }

    public createId(username: string): Uuid {
        return this.uuid.create(username);
    }

    public async getByUsername(username: string): Promise<UserInterface> {
        const uuid = this.createId(username);
        const user = await this.manager.findOne(User, { where: { id: uuid }, cache: 60 });

        if (!user) {
            throw new NotFoundException('User does not exists');
        }
        return user;
    }
}
