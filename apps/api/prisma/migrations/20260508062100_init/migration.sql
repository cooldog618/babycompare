/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `originalUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SearchLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "query" TEXT NOT NULL,
    "sort" TEXT NOT NULL,
    "resultCount" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source" TEXT NOT NULL,
    "externalId" TEXT,
    "title" TEXT NOT NULL,
    "brand" TEXT,
    "maker" TEXT,
    "category1" TEXT,
    "category2" TEXT,
    "category3" TEXT,
    "category4" TEXT,
    "categoryPath" TEXT,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "productUrl" TEXT NOT NULL,
    "seller" TEXT,
    "rating" REAL,
    "reviewCount" INTEGER,
    "description" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "lastSyncedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("brand", "createdAt", "id", "imageUrl", "price", "rating", "reviewCount", "source", "title", "updatedAt") SELECT "brand", "createdAt", "id", "imageUrl", "price", "rating", "reviewCount", "source", "title", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_productUrl_key" ON "Product"("productUrl");
CREATE UNIQUE INDEX "Product_source_externalId_key" ON "Product"("source", "externalId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
