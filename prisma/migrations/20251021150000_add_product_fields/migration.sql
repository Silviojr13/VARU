-- AlterTable
ALTER TABLE "Product" ADD COLUMN "brand" TEXT;
ALTER TABLE "Product" ADD COLUMN "description" TEXT;
ALTER TABLE "Product" ADD COLUMN "location" TEXT;
ALTER TABLE "Product" ADD COLUMN "cost_price" REAL;
ALTER TABLE "Product" ADD COLUMN "sale_price" REAL;
ALTER TABLE "Product" ADD COLUMN "profit_margin" REAL;
ALTER TABLE "Product" ADD COLUMN "current_stock" REAL NOT NULL DEFAULT 0.0;