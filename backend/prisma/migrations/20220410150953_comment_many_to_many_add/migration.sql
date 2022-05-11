-- CreateTable
CREATE TABLE "CommentsOnPosts" (
    "postId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CommentsOnPosts_pkey" PRIMARY KEY ("postId","commentId")
);

-- AddForeignKey
ALTER TABLE "CommentsOnPosts" ADD CONSTRAINT "CommentsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsOnPosts" ADD CONSTRAINT "CommentsOnPosts_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
