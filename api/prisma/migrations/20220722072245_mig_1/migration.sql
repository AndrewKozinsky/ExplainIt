-- CreateTable
CREATE TABLE "articles" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "summary" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "order_number" SMALLINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_name_key" ON "articles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "articles_summary_key" ON "articles"("summary");

-- CreateIndex
CREATE UNIQUE INDEX "articles_content_key" ON "articles"("content");

-- CreateIndex
CREATE UNIQUE INDEX "articles_order_number_key" ON "articles"("order_number");
