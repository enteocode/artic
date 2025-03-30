import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user.entity';
import { UserService } from '../user.service';

// Create seed Users

export class CreateUsers1665949564977 implements MigrationInterface {
    constructor(private readonly user: UserService) {}

    public async up(queryRunner: QueryRunner) {
        await queryRunner.manager.insert(User, this.user.create(this.getUsername(), 'password'));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete(User, this.user.createId(this.getUsername()));
    }

    private getUsername(): string {
        return 'user@email.com';
    }
}
