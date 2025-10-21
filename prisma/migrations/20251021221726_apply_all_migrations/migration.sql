-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf_cnpj" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "contact_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Supplier" ("cnpj", "contact_name", "created_at", "email", "id", "name", "phone") SELECT "cnpj", "contact_name", "created_at", "email", "id", "name", "phone" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER,
    "unit_id" INTEGER NOT NULL,
    "min_stock" REAL NOT NULL DEFAULT 0.0,
    "ncm" TEXT,
    "gtin" TEXT,
    "active" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("active", "category_id", "created_at", "gtin", "id", "min_stock", "name", "ncm", "sku", "unit_id") SELECT "active", "category_id", "created_at", "gtin", "id", "min_stock", "name", "ncm", "sku", "unit_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE TABLE "new_InventoryMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "client_id" TEXT,
    "supplier_id" INTEGER,
    "quantity" REAL NOT NULL,
    "unit_cost" REAL,
    "doc_ref" TEXT,
    "nfeId" INTEGER,
    "occurred_at" DATETIME NOT NULL,
    "created_by" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "InventoryMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MovementType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_nfeId_fkey" FOREIGN KEY ("nfeId") REFERENCES "Nfe" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_InventoryMovement" ("created_at", "created_by", "doc_ref", "id", "nfeId", "occurred_at", "productId", "quantity", "typeId", "unit_cost", "warehouseId") SELECT "created_at", "created_by", "doc_ref", "id", "nfeId", "occurred_at", "productId", "quantity", "typeId", "unit_cost", "warehouseId" FROM "InventoryMovement";
DROP TABLE "InventoryMovement";
ALTER TABLE "new_InventoryMovement" RENAME TO "InventoryMovement";
CREATE TABLE "new_MovementType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "direction" INTEGER NOT NULL
);
INSERT INTO "new_MovementType" ("code", "direction", "id") SELECT "code", "direction", "id" FROM "MovementType";
DROP TABLE "MovementType";
ALTER TABLE "new_MovementType" RENAME TO "MovementType";
CREATE UNIQUE INDEX "MovementType_code_key" ON "MovementType"("code");
CREATE TABLE "new_Nfe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access_key" TEXT,
    "number" TEXT,
    "series" TEXT,
    "issued_at" DATETIME,
    "supplierId" INTEGER,
    CONSTRAINT "Nfe_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "movements" INTEGER,
    CONSTRAINT "Nfe_movements_fkey" FOREIGN KEY ("movements") REFERENCES "InventoryMovement" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Nfe" ("access_key", "id", "issued_at", "number", "series", "supplierId") SELECT "access_key", "id", "issued_at", "number", "series", "supplierId" FROM "Nfe";
DROP TABLE "Nfe";
ALTER TABLE "new_Nfe" RENAME TO "Nfe";
CREATE UNIQUE INDEX "Nfe_access_key_key" ON "Nfe"("access_key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_cnpj_key" ON "Client"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_cnpj_key" ON "Supplier"("cnpj");