import mongoose, { Document, Schema } from 'mongoose'

export interface IAnalytics extends Document {
  _id: string
  totalPastes: number
  totalViews: number
  totalCopies: number
  totalShares: number
  pastesByDay: Map<string, number>
  viewsByDay: Map<string, number>
  copiesByDay: Map<string, number>
  sharesByDay: Map<string, number>
  activeIPs: number
  avgPasteLength: number
  lastUpdated: Date
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    _id: {
      type: String,
      required: true,
    },
    totalPastes: {
      type: Number,
      default: 0,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    totalCopies: {
      type: Number,
      default: 0,
    },
    totalShares: {
      type: Number,
      default: 0,
    },
    pastesByDay: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    viewsByDay: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    copiesByDay: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    sharesByDay: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    activeIPs: {
      type: Number,
      default: 0,
    },
    avgPasteLength: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: process.env.MONGODB_ANALYTICS_COLLECTION || 'analytics',
    _id: false, // Disable automatic ObjectId _id
  }
)

// Create a singleton document pattern by using a fixed _id
AnalyticsSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next()
  }
  this._id = 'stats'
  next()
})

const Analytics =
  mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema)

export default Analytics
