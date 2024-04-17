-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "mailTo" TEXT;

-- CreateTable
CREATE TABLE "CodeResetPassword" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CodeResetPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeResetPassword" ADD CONSTRAINT "CodeResetPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
