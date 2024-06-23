-- CreateTable
CREATE TABLE "NoteService" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteService_pkey" PRIMARY KEY ("id")
);
