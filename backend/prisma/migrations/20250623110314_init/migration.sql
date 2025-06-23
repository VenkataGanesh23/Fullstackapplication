-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "images" TEXT[],
    "descriptions" TEXT[],

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
