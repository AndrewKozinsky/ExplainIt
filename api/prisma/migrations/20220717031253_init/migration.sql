-- CreateTable
CREATE TABLE "Article" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "article_number" VARCHAR(100) NOT NULL,
    "published" BOOLEAN NOT NULL,
    "summary" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "order_number" SMALLINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_name_key" ON "Article"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Article_article_number_key" ON "Article"("article_number");

-- CreateIndex
CREATE UNIQUE INDEX "Article_summary_key" ON "Article"("summary");

-- CreateIndex
CREATE UNIQUE INDEX "Article_content_key" ON "Article"("content");

-- CreateIndex
CREATE UNIQUE INDEX "Article_order_number_key" ON "Article"("order_number");
