import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// Creates basic table for Favorite

export class CreateFavoriteTable1666336937431 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'favorite',
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
                        name: 'user',
                        type: 'char',
                        length: '36'
                    },
                    {
                        name: 'artwork',
                        type: 'integer',
                        unsigned: true
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                        columnNames: ['user'],
                        onDelete: 'CASCADE'
                    }
                ],
                indices: [
                    {
                        columnNames: ['user', 'artwork'],
                        isUnique: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('favorite');
    }
}
