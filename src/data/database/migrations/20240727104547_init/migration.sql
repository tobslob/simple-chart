/*
  Warnings:

  - A unique constraint covering the columns `[emailAddress,date]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users"("id");

-- CreateIndex
CREATE INDEX "Users_emailAddress_idx" ON "Users"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Users_emailAddress_date_key" ON "Users"("emailAddress", "date");
