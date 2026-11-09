import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1792519206236 implements MigrationInterface {
    name = 'CreateOrders1792519206236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.query('CREATE SCHEMA IF NOT EXISTS "orders"');
        await queryRunner.query(`CREATE TABLE "orders"."orders" ("orderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "customerId" uuid NOT NULL, CONSTRAINT "PK_41ba27842ac1a2c24817ca59eaa" PRIMARY KEY ("orderId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"."orders"`);
    }

}
