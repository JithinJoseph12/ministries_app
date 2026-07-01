import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Article from "@/src/lib/models/Article";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'Article ID is required' }, { status: 400 });
    }
    
    const deletedArticle = await Article.findByIdAndDelete(id);
    
    if (!deletedArticle) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete article', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'Article ID is required' }, { status: 400 });
    }
    
    const article = await Article.findById(id).populate('createdBy', 'firstName lastName');
    
    if (!article) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }

    const relatedArticles = await Article.find({ 
      category: article.category, 
      _id: { $ne: article._id }
    })
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(3);
    
    return NextResponse.json({ success: true, article, relatedArticles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch article', error: error.message },
      { status: 500 }
    );
  }
}
