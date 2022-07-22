/*
  Warnings:

  - A unique constraint covering the columns `[article_number]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `article_number` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "article_number" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "articles_article_number_key" ON "articles"("article_number");
