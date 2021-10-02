import {MigrationInterface, QueryRunner} from "typeorm";

export class contacts1630565316988 implements MigrationInterface {
    name = 'contacts1630565316988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean DEFAULT false, "deletedBy" character varying(300), "createdDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdBy" character varying(300), "updatedDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" character varying(300), "name" character varying(300) NOT NULL, "phoneNr" character varying(30) NOT NULL, "email" character varying(50) NOT NULL, "contactGroupId" uuid, CONSTRAINT "PK_68782cec65c8eef577c62958273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ContactGroups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean DEFAULT false, "deletedBy" character varying(300), "createdDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdBy" character varying(300), "updatedDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" character varying(300), "name" character varying(300) NOT NULL, CONSTRAINT "PK_b656fbaf516e7ceb08a97a41525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_d76ca9285696f73ee58f6ddd3ef" FOREIGN KEY ("contactGroupId") REFERENCES "ContactGroups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_d76ca9285696f73ee58f6ddd3ef"`);
        await queryRunner.query(`DROP TABLE "ContactGroups"`);
        await queryRunner.query(`DROP TABLE "Contacts"`);
    }

}
