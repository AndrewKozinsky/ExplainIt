/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `articles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "articles_article_number_key";

-- DropIndex
DROP INDEX "articles_content_key";

-- DropIndex
DROP INDEX "articles_name_key";

-- DropIndex
DROP INDEX "articles_order_number_key";

-- DropIndex
DROP INDEX "articles_summary_key";

-- CreateIndex
CREATE UNIQUE INDEX "articles_id_key" ON "articles"("id");
