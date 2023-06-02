-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Demo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Demo" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Demo";
DROP TABLE "Demo";
ALTER TABLE "new_Demo" RENAME TO "Demo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
