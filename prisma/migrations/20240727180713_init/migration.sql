-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL DEFAULT '',
    "lastname" TEXT NOT NULL DEFAULT '',
    "storage_capacity" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "premium" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "filesize" INTEGER NOT NULL,
    "uploaddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
