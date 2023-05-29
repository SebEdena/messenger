import { MigrationInterface, QueryRunner } from 'typeorm';

export class Audit1681566263055 implements MigrationInterface {
  name = 'Audit1681566263055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "timestamp"`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "room" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "room" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }
}
