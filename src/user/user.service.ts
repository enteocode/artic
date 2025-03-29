import { Injectable, NotFoundException } from '@nestjs/common';
import { UuidService } from '../uuid/uuid.service';
import { UserInterface } from './user.interface';
import { User } from './user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly manager: EntityManager,
        private readonly uuid: UuidService
    ) {}

    create(username: string, password: string): UserInterface {
        // Username is a read-only field, thus we can generate the ID
        // to avoid extra selects in ORM on complex queries

        return {
            id: this.getId(username),
            username,
            password
        };
    }

    getId(username: string): string {
        return this.uuid.create(username);
    }

    async getByUsername(username: string): Promise<UserInterface> {
        const uuid = this.getId(username);
        const user = await this.manager.findOne(User, uuid);

        if (!user) {
            throw new NotFoundException('User does not exists');
        }
        return user;
    }
}
