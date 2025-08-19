import mongoose, { Schema, InferSchemaType } from 'mongoose';

// Sub-schema for Open Graph data stored with each page
// These fields power social previews (Facebook, LinkedIn, X, Discord, etc.)
const OpenGraphSchema = new Schema({
  title: { type: String, required: true },          // og:title — short, compelling headline
  description: { type: String, required: true },    // og:description — 100+ chars recommended
  image: { type: String, required: false },         // og:image — poster image (absolute URL)
  video: { type: String, required: false },         // optional: og:video — used by some platforms
  videoType: { type: String, required: false, default: 'video/mp4' },
  videoWidth: { type: Number, required: false, default: 1200 },
  videoHeight: { type: Number, required: false, default: 630 },
  type: { type: String, required: false, default: 'website' }, // e.g. website, video.other
  url: { type: String, required: false }            // canonical URL for the page
}, { _id: false });

// Main Page schema — represents a single shareable page with content + OG metadata
const PageSchema = new Schema({
  slug: { type: String, required: true, unique: true, index: true },  // URL segment, e.g. services
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: false },
  canonicalUrl: { type: String, required: false },
  openGraph: { type: OpenGraphSchema, required: true },
  twitter: {                                       // Twitter card hints
    card: { type: String, default: 'summary_large_image' },
    site: { type: String, required: false },
    creator: { type: String, required: false }
  }
}, { timestamps: true });

export type Page = InferSchemaType<typeof PageSchema>;

export default mongoose.models.Page || mongoose.model('Page', PageSchema);


