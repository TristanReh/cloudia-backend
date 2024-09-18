/*
  Warnings:

  - Added the required column `buffer` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "buffer" BYTEA NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL;
