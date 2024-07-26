-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Users_id_emailAddress_idx" ON "Users"("id", "emailAddress");
