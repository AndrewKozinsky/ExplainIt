/*
  Warnings:

  - You are about to drop the column `article_number` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `order_number` on the `articles` table. All the data in the column will be lost.
  - Added the required column `label` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "article_number",
DROP COLUMN "order_number",
ADD COLUMN     "label" VARCHAR(100) NOT NULL,
ADD COLUMN     "order" SMALLINT NOT NULL;
