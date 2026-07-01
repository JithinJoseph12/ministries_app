import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  articleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Article', 
    required: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { 
    type: String, 
    required: true,
    trim: true
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  parentCommentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment', 
    default: null 
  }
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
