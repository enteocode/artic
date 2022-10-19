import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// Creates basic table for User

export class CreateUserTable1665948781134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            generationStrategy: 'uuid',
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'password',
            type: 'char',
            length: '60'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }

}
