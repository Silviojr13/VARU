import prisma from "../src/lib/prisma";

async function main() {
  console.log("Applying migration to add product fields...");
  
  // Since we're using Turso, we'll need to execute the SQL directly
  // We'll read the migration file and execute each statement
  const migrationStatements = [
    `ALTER TABLE "Product" ADD COLUMN "brand" TEXT`,
    `ALTER TABLE "Product" ADD COLUMN "description" TEXT`,
    `ALTER TABLE "Product" ADD COLUMN "location" TEXT`,
    `ALTER TABLE "Product" ADD COLUMN "cost_price" REAL`,
    `ALTER TABLE "Product" ADD COLUMN "sale_price" REAL`,
    `ALTER TABLE "Product" ADD COLUMN "profit_margin" REAL`,
    `ALTER TABLE "Product" ADD COLUMN "current_stock" REAL NOT NULL DEFAULT 0.0`
  ];
  
  try {
    for (const statement of migrationStatements) {
      console.log(`Executing: ${statement}`);
      // @ts-ignore - Prisma doesn't have a direct method for raw DDL statements
      await prisma.$executeRawUnsafe(statement);
    }
    
    console.log("Migration applied successfully!");
  } catch (error) {
    console.error("Error applying migration:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();