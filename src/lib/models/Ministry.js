import mongoose from 'mongoose';

const MinistrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  missionStatement: { type: String, required: true },
  fullDescription: { type: String },
  yearFounded: { type: String },
  primaryLocation: { type: String },
  serviceArea: { type: String },
  website: { type: String },
  email: { type: String },
  whatWeDo: { type: String },
  whoWeServe: { type: String },
  status: { type: String, default: 'Active' },
  events: { type: Number, default: 0 },
  leader: { type: String, default: 'Unassigned' }
}, { timestamps: true });

// Check if the model already exists to avoid recompilation errors in Next.js
export default mongoose.models.Ministry || mongoose.model('Ministry', MinistrySchema);
