import { MigrationInterface, QueryRunner } from "typeorm";

export class address1666311534758 implements MigrationInterface {
    name = 'address1666311534758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "district" character varying(128) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "district"`);
    }

}
