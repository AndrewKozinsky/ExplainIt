/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[article_number]` on the table `articles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "articles_name_key" ON "articles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "articles_article_number_key" ON "articles"("article_number");
