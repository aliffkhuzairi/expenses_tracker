-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Budget_category_key" ON "Budget"("category");
