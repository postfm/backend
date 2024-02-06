/*
  Warnings:

  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_name_idx";

-- DropIndex
DROP INDEX "users_name_idx";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL;
