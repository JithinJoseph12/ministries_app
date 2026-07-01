import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Comment from "@/src/lib/models/Comment";
import { getUserFromToken } from "@/src/lib/auth";

export async function POST(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
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

    // Check if user already liked it
    const hasLiked = comment.likes.includes(user._id);

    if (hasLiked) {
      // Unlike
      comment.likes = comment.likes.filter(id => id.toString() !== user._id.toString());
    } else {
      // Like
      comment.likes.push(user._id);
    }

    await comment.save();

    return NextResponse.json({ 
      success: true, 
      message: hasLiked ? 'Comment unliked' : 'Comment liked',
      likes: comment.likes,
      hasLiked: !hasLiked
    }, { status: 200 });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to toggle like', error: error.message },
      { status: 500 }
    );
  }
}
