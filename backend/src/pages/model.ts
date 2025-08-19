import mongoose, { Schema, InferSchemaType } from 'mongoose';

const OpenGraphSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  video: { type: String, required: false }, // Add video support
  videoType: { type: String, required: false, default: 'video/mp4' }, // video/mp4, video/webm, etc.
  videoWidth: { type: Number, required: false, default: 1200 },
  videoHeight: { type: Number, required: false, default: 630 },
  type: { type: String, required: false, default: 'website' },
  url: { type: String, required: false }
}, { _id: false });

const PageSchema = new Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: false },
  canonicalUrl: { type: String, required: false },
  openGraph: { type: OpenGraphSchema, required: true },
  twitter: {
    card: { type: String, default: 'summary_large_image' },
    site: { type: String, required: false },
    creator: { type: String, required: false }
  }
}, { timestamps: true });

export type Page = InferSchemaType<typeof PageSchema>;

export default mongoose.models.Page || mongoose.model('Page', PageSchema);


