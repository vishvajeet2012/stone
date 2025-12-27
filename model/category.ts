import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategory?: mongoose.Types.ObjectId; 
  type: "stone" | "service" | "collection" | "project";
  description?: string;
  images: mongoose.Types.ObjectId[];
  BannerImages: mongoose.Types.ObjectId[]; 
  subCategories?: { label: string; href: string }[];
  level?: number; 
  order?: number;
  showInMenu: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Slug is required"],
      index: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    type: {
      type: String,
      enum: ["stone", "service", "collection", "project"],
      default: "stone",
    },
    images: [{
      type: Schema.Types.ObjectId,
      ref: "Image",
    }],
    BannerImages: [{
      type: Schema.Types.ObjectId,
      ref: "Image",
    }],
    
    subCategories: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
    ],
    level: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    showInMenu: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
