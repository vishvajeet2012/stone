import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  category: mongoose.Types.ObjectId; // Link to Category
  location?: string;
  
  // Products Used
  products: mongoose.Types.ObjectId[]; 
  stoneUsed?: string; 

  // Detailed Info
  finish?: string;
  application?: string;
  architect?: string;
  completionYear?: string;
  
  description: string;
  image: string; 
  gallery: string[];
  isFeatured: boolean;
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
      index: true, // Explicitly indexed for faster lookup
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
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
