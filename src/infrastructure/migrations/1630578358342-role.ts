import {MigrationInterface, QueryRunner} from "typeorm";

export class role1630578358342 implements MigrationInterface {
    name = 'role1630578358342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "role" integer NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "role"`);
    }

}
