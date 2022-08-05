-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "article_number" VARCHAR(100) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "summary" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "order_number" SMALLINT NOT NULL,
    "payAtn" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_id_key" ON "articles"("id");
