import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user.entity';
import { UserService } from '../user.service';

// Create seed Users

export class CreateUsers1665949564977 implements MigrationInterface {
  constructor(private readonly user: UserService) {}

  public async up(queryRunner: QueryRunner) {
    const list = this.getUsernames();
    const pass = 'password';

    await queryRunner.manager.insert(User, list.map((user) => {
      return this.user.create(user, pass)
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const list = this.getUsernames();

    await queryRunner.manager.delete(User, list.map((user) => this.user.getId(user)))
  }

  private getUsernames(): string[] {
    return ['user1@email.com', 'user2@email.com'];
  }

}
