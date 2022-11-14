import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1660422271105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        isUnique: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'username',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'avatar_path',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'roles',
                        type: ''
                    },
                    {
                        name: 'social_link',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'remember_token',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'like',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'is_verified',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestampz',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestampz',
                        default: 'now()',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

