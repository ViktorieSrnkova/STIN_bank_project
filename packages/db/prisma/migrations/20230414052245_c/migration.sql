-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "fromAccountId" DROP NOT NULL,
ALTER COLUMN "toAccountId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ExRate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currency" "Currency" NOT NULL,
    "exRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExRate_pkey" PRIMARY KEY ("id")
);
