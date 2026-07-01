import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Comment from "@/src/lib/models/Comment";
import { getUserFromToken } from "@/src/lib/auth";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'Article ID is required' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const sortOrder = searchParams.get('sort') === 'oldest' ? 1 : -1;

    // Fetch all comments for this article
    const comments = await Comment.find({ articleId: id })
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: sortOrder });

    // Group comments into 1-level deep threads (parents and replies)
    const threadedComments = [];
    const replies = [];

    const user = await getUserFromToken();
    const userId = user ? user._id.toString() : null;

    comments.forEach(comment => {
      const commentObj = comment.toObject();
      commentObj.hasLiked = userId ? commentObj.likes.some(id => id.toString() === userId) : false;

      if (commentObj.parentCommentId) {
        replies.push(commentObj);
      } else {
        // Parent comments
        threadedComments.push({
          ...commentObj,
          replies: []
        });
      }
    });

    // Attach replies to parents (sorted by oldest first usually, but we'll use the requested sort)
    replies.forEach(reply => {
      const parent = threadedComments.find(p => p._id.toString() === reply.parentCommentId.toString());
      if (parent) {
        parent.replies.push(reply);
      }
    });

    return NextResponse.json({ 
      success: true, 
      comments: threadedComments,
      userRole: user ? user.role : null
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'Article ID is required' }, { status: 400 });
    }

    const { content, parentCommentId } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, message: 'Comment content is required' }, { status: 400 });
    }

    const newComment = await Comment.create({
      articleId: id,
      createdBy: user._id,
      content,
      parentCommentId: parentCommentId || null
    });

    const populatedComment = await newComment.populate('createdBy', 'firstName lastName');

    return NextResponse.json({ success: true, message: 'Comment added successfully', comment: populatedComment }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to add comment', error: error.message },
      { status: 500 }
    );
  }
}
