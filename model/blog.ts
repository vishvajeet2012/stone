import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: mongoose.Types.ObjectId;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  // SEO Fields
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
    ogImage?: mongoose.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Slug is required"],
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: 300,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
    author: {
      type: String,
      default: "Admin",
    },
    tags: [{ type: String, trim: true }],
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    // SEO Fields
    seo: {
      metaTitle: { type: String, maxlength: 60 },
      metaDescription: { type: String, maxlength: 160 },
      metaKeywords: [{ type: String }],
      canonicalUrl: { type: String },
      ogImage: { type: Schema.Types.ObjectId, ref: "Image" },
    },
  },
  { timestamps: true }
);

// Auto-set publishedAt when isPublished becomes true
BlogSchema.pre("save", function () {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
