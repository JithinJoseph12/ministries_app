import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  hostMinistry: { type: String },
  shortDescription: { type: String },
  description: { type: String },
  startDate: { type: String, required: true },
  startTime: { type: String },
  endDate: { type: String },
  endTime: { type: String },
  allDay: { type: Boolean, default: false },
  venue: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  mapUrl: { type: String },
  contactPerson: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  registrationLink: { type: String },
  registrationUrl: { type: String },
  status: { type: String, default: 'Published' },
  visibility: { type: String, default: 'Public' },
  featured: { type: Boolean, default: false },
  allowRegistration: { type: Boolean, default: true },
}, { timestamps: true });

// Check if the model already exists to avoid recompilation errors in Next.js
export default mongoose.models.Event || mongoose.model('Event', EventSchema);
