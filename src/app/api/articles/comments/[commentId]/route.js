import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Comment from "@/src/lib/models/Comment";
import { getUserFromToken } from "@/src/lib/auth";

export async function DELETE(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ success: false, message: 'Unauthorized. Only superadmins can delete comments.' }, { status: 401 });
    }

    await connectDB();
    const { commentId } = await params;
    
    if (!commentId) {
      return NextResponse.json({ success: false, message: 'Comment ID is required' }, { status: 400 });
    }

    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return NextResponse.json({ success: false, message: 'Comment not found' }, { status: 404 });
    }

    if (!comment.parentCommentId) {
      // It's a parent comment. Delete it and all its replies.
      await Comment.deleteMany({ parentCommentId: commentId });
      await Comment.findByIdAndDelete(commentId);
    } else {
      // It's a reply comment. Just delete it.
      await Comment.findByIdAndDelete(commentId);
    }

    return NextResponse.json({ success: true, message: 'Comment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete comment', error: error.message },
      { status: 500 }
    );
  }
}
