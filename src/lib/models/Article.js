import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true, default: "No description provided." },
  category: { 
    type: String, 
    required: true,
    enum: ['Announcements', 'Leadership Updates', 'Prayer Requests', 'Formation']
  },
  content: { type: String, required: true },
  image: { type: String, default: '/images/blog.png' },
  visibility: { type: String, default: 'leaders' },
  status: { type: String, default: 'published' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
