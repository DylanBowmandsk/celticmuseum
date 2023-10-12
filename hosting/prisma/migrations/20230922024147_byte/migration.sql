/*
  Warnings:

  - You are about to alter the column `path` on the `Shirt` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shirt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "match" TEXT NOT NULL,
    "home" BOOLEAN NOT NULL,
    "date" DATETIME NOT NULL,
    "path" BLOB NOT NULL
);
INSERT INTO "new_Shirt" ("date", "home", "id", "match", "number", "path", "player") SELECT "date", "home", "id", "match", "number", "path", "player" FROM "Shirt";
DROP TABLE "Shirt";
ALTER TABLE "new_Shirt" RENAME TO "Shirt";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
