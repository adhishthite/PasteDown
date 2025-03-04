import mongoose, { Document, Schema } from 'mongoose'

export interface IPaste extends Document {
  id: string
  content: string
  createdAt: Date
  expiresAt: Date
}

const PasteSchema = new Schema<IPaste>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    collection: process.env.MONGODB_COLLECTION || 'pastes',
  }
)

const Paste = mongoose.models.Paste || mongoose.model<IPaste>('Paste', PasteSchema)

export default Paste
