import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  location?: string;
  stoneUsed?: string;
  products: mongoose.Types.ObjectId[];
  finish?: string;
  application?: string;
  architect?: string;
  completionYear?: string;
  description: string;
  // Main image for card display
  image?: mongoose.Types.ObjectId;
  // Gallery images for lightbox
  gallery: mongoose.Types.ObjectId[];
  // Legacy fields - kept for backward compatibility
  images: mongoose.Types.ObjectId[];
  BannerImages: mongoose.Types.ObjectId[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Project Category is required"],
      index: true,
    },
    location: { type: String, trim: true },
    stoneUsed: { type: String, trim: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    finish: { type: String, trim: true },
    application: { type: String, trim: true },
    architect: { type: String, trim: true },
    completionYear: { type: String, trim: true },
    description: { type: String, required: true },
    // Main display image
    image: { type: Schema.Types.ObjectId, ref: "Image" },
    // Gallery for lightbox
    gallery: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    // Legacy fields
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    BannerImages: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;

