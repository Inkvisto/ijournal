/*
  Warnings:

  - You are about to drop the `CommentsOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentsOnPosts" DROP CONSTRAINT "CommentsOnPosts_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentsOnPosts" DROP CONSTRAINT "CommentsOnPosts_postId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "postId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CommentsOnPosts";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
