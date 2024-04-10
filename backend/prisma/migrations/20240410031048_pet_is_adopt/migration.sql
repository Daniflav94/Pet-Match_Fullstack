/*
  Warnings:

  - You are about to drop the column `birthdate` on the `FormAdoption` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `FormAdoption` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `FormAdoption` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `FormAdoption` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `FormAdoption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormAdoption" DROP COLUMN "birthdate",
DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "state";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "isAdopt" SET DEFAULT false;
