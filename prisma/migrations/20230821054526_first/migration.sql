-- CreateTable
CREATE TABLE "Shirt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "match" TEXT NOT NULL,
    "home" BOOLEAN NOT NULL,
    "date" DATETIME NOT NULL,
    "path" TEXT NOT NULL
);
