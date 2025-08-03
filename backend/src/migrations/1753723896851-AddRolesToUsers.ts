import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesToUsers1753723896851 implements MigrationInterface {
  name = 'AddRolesToUsers1753723896851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('super_admin', 'tenant_admin', 'user')
        `);
    await queryRunner.query(`
            ALTER TABLE "user" 
            ADD COLUMN "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
