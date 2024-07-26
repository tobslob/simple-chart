-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sleepTimeDuration" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
