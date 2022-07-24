-- CreateTable
CREATE TABLE "articles" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "article_number" VARCHAR(100) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "summary" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "order_number" SMALLINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_id_key" ON "articles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "articles_name_key" ON "articles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "articles_article_number_key" ON "articles"("article_number");
