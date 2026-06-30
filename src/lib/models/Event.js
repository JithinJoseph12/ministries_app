import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
      // Ministry that owns this event
  ministryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ministry",
      required: false,
      index: true,
    },
  hostMinistry: { type: String },
    // User who created the event
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  sponsor: { type: String },
  shortDescription: { type: String },
  description: { type: String },
  schedules: [{
    id: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    allDay: { type: Boolean, default: false },
    timezone: { type: String, default: 'America/New_York' },
    notes: { type: String },
    recurrence: {
      enabled: { type: Boolean, default: false },
      frequency: { type: String, enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'], default: 'none' },
      interval: { type: Number, default: 1 },
      weekdays: [{ type: String }],
      monthlyType: { type: String },
      dayOfMonth: { type: Number },
      weekNumber: { type: String },
      weekday: { type: String },
      yearlyMonth: { type: String },
      yearlyDay: { type: Number },
      endCondition: { type: String, default: 'never' },
      until: { type: String },
      count: { type: Number }
    }
  }],
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
  status: {
    type: String,
    enum: ["Draft", "Published", "Cancelled"],
    default: "Published",
  },
  visibility: {
    type: String,
    enum: ["Public", "Private"],
    default: "Public",
  },
  featured: { type: Boolean, default: false },
  allowRegistration: { type: Boolean, default: true },
}, { timestamps: true });

// Check if the model already exists to avoid recompilation errors in Next.js
if (process.env.NODE_ENV !== 'production' && mongoose.models.Event) {
  delete mongoose.models.Event;
}
export default mongoose.models.Event || mongoose.model('Event', EventSchema);
