PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO User VALUES('1','joao','joao@teste.com','vevvevver',1,'2025-10-06 19:35:03');
INSERT INTO User VALUES('2','fafaela','fafa@teste.com','aferbtrbvervr',1,'2025-10-06 19:35:30');
CREATE TABLE IF NOT EXISTS "UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "roleId"),
    CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "contact_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
, "mobile" TEXT, address TEXT, city TEXT, state TEXT, zip_code TEXT, is_active INTEGER NOT NULL DEFAULT 1, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO Supplier VALUES(1,'Test Supplier','123456789','John Doe','john@example.com','1234567890','2025-10-21T23:00:56.928+00:00','0987654321','123 Main St','Test City','TS','12345-678',1,'2025-10-21T23:00:56.928+00:00');
INSERT INTO Supplier VALUES(3,'Test Supplier','12345678901234','John Doe','supplier@example.com','1234567890','2025-10-21T23:15:18.202+00:00','0987654321','123 Supplier St','Supplier City','SP','12345-678',1,'2025-10-21T23:15:18.202+00:00');
INSERT INTO Supplier VALUES(4,'teste','3123123123','lululu','silvio@silvio.com','431431','2025-10-21T23:50:01.671+00:00','41 998021400','','','','',1,'2025-10-21T23:50:01.671+00:00');
CREATE TABLE IF NOT EXISTS "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO Category VALUES(1,'teste');
INSERT INTO Category VALUES(2,'Eletrônicos');
INSERT INTO Category VALUES(3,'Periféricos');
INSERT INTO Category VALUES(4,'Escritório');
INSERT INTO Category VALUES(5,'Móveis');
INSERT INTO Category VALUES(6,'Limpeza');
INSERT INTO Category VALUES(7,'Alimentação');
INSERT INTO Category VALUES(8,'Vestuário');
INSERT INTO Category VALUES(9,'Brinquedos');
CREATE TABLE IF NOT EXISTS "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "factor_to_base" REAL NOT NULL DEFAULT 1.0
);
INSERT INTO Unit VALUES(1,'1234','teste',11);
CREATE TABLE IF NOT EXISTS "Warehouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT
);
CREATE TABLE IF NOT EXISTS "WarehouseMeta" (
    "warehouseId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "manager_name" TEXT,
    "phone" TEXT,
    "open_hours" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    CONSTRAINT "WarehouseMeta_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER,
    "unit_id" INTEGER NOT NULL,
    "min_stock" REAL NOT NULL DEFAULT 0.0,
    "ncm" TEXT,
    "gtin" TEXT,
    "active" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "brand" TEXT, "description" TEXT, "location" TEXT, "cost_price" REAL, "sale_price" REAL, "profit_margin" REAL, "current_stock" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Product VALUES(1,'SKU123','Produto Exemplo',1,1,7,'12345678','7891234567890',0,'2025-10-07 00:34:53','aa',NULL,'aa',11,111,1,10);
CREATE TABLE IF NOT EXISTS "MovementType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "direction" INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS "Nfe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access_key" TEXT,
    "number" TEXT,
    "series" TEXT,
    "issued_at" DATETIME,
    "supplierId" INTEGER,
    CONSTRAINT "Nfe_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "InventoryMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,
    "unit_cost" REAL,
    "doc_ref" TEXT,
    "nfeId" INTEGER,
    "occurred_at" DATETIME NOT NULL,
    "created_by" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, client_id TEXT, supplier_id INTEGER, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, notes TEXT,
    CONSTRAINT "InventoryMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MovementType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_nfeId_fkey" FOREIGN KEY ("nfeId") REFERENCES "Nfe" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryMovement_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "supplierId" INTEGER,
    "expected_at" DATETIME,
    "received_at" DATETIME,
    "notes" TEXT,
    CONSTRAINT "Delivery_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "table_name" TEXT NOT NULL,
    "row_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT,
    "changed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "TransportMatrix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin_wh_id" INTEGER NOT NULL,
    "dest_wh_id" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "distance_km" REAL,
    "lead_time_hours" REAL NOT NULL,
    "cost_fixed" REAL NOT NULL DEFAULT 0,
    "cost_per_unit" REAL NOT NULL DEFAULT 0,
    "is_active" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "TransportMatrix_origin_wh_id_fkey" FOREIGN KEY ("origin_wh_id") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransportMatrix_dest_wh_id_fkey" FOREIGN KEY ("dest_wh_id") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Client" (
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
INSERT INTO Client VALUES('client_1','Test Client','12345678901','test@example.com','1234567890','0987654321','123 Main St','Test City','TS','12345-678',1,'2025-10-21T23:06:06.833+00:00','2025-10-21T23:06:06.833+00:00');
INSERT INTO Client VALUES('client_2','Test Client 2','12345678902','test2@example.com','1234567890','0987654321','123 Main St','Test City','TS','12345-678',1,'2025-10-21T23:15:04.287+00:00','2025-10-21T23:15:04.287+00:00');
INSERT INTO Client VALUES('client_1761089379117','aa','32131243','gewavew','41341','4314314','efadfae','fadfa','MA','1341431',1,'2025-10-21T23:29:39.252+00:00','2025-10-21T23:29:39.252+00:00');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Category',9);
INSERT INTO sqlite_sequence VALUES('Unit',1);
INSERT INTO sqlite_sequence VALUES('Product',4);
INSERT INTO sqlite_sequence VALUES('Supplier',4);
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "Unit_code_key" ON "Unit"("code");
CREATE UNIQUE INDEX "Warehouse_code_key" ON "Warehouse"("code");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE UNIQUE INDEX "MovementType_code_key" ON "MovementType"("code");
CREATE UNIQUE INDEX "Nfe_access_key_key" ON "Nfe"("access_key");
CREATE UNIQUE INDEX "TransportMatrix_origin_wh_id_dest_wh_id_mode_key" ON "TransportMatrix"("origin_wh_id", "dest_wh_id", "mode");
CREATE UNIQUE INDEX "Client_cpf_cnpj_key" ON "Client"("cpf_cnpj")
      ;
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email")
      ;
COMMIT;
