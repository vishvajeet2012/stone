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
  image: mongoose.Types.ObjectId;
  gallery: mongoose.Types.ObjectId[];
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
    image: { type: Schema.Types.ObjectId, ref: "Image", required: true },
    gallery: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
