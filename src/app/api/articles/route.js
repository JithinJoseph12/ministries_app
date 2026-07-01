import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/lib/models/Article";
import Comment from "@/src/lib/models/Comment";
import { getUserFromToken } from "@/src/lib/auth";

export async function POST(request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const body = await request.json();
    
    const article = await Article.create({ ...body, createdBy: user._id });
    
    return NextResponse.json(
      { success: true, message: 'Article created successfully', article },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to create article', error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const skip = (page - 1) * limit;

    await connectDB();
    
    let query = {};
    if (user.role !== 'superadmin') {
      query.visibility = { $ne: 'heads' };
    }

    const totalItems = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const articles = await Article.find(query)
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const articlesWithCommentCount = await Promise.all(
      articles.map(async (article) => {
        const commentCount = await Comment.countDocuments({ articleId: article._id });
        return { ...article, commentCount };
      })
    );
    
    return NextResponse.json({ 
      success: true, 
      articles: articlesWithCommentCount,
      pagination: {
        page,
        limit,
        totalPages,
        totalItems
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch articles', error: error.message },
      { status: 500 }
    );
  }
}
