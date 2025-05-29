/*
  Warnings:

  - You are about to drop the column `DOB` on the `User` table. All the data in the column will be lost.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "DOB",
ADD COLUMN     "dob" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
