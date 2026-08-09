-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "gamerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "skillLevel" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
