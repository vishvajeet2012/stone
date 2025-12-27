import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  type: "stone" | "service" | "collection" | "project";
  description?: string;
  bannerText?: string; // Text to display on the banner
  isActive: boolean; // Category active status
  thumbnailImage?: mongoose.Types.ObjectId; // For TopCategory cards (300x300px)
  images: mongoose.Types.ObjectId[];
  BannerImages: mongoose.Types.ObjectId[];
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
    type: {
      type: String,
      enum: ["stone", "service", "collection", "project"],
      default: "stone",
    },
    description: {
      type: String,
      trim: true,
    },
    bannerText: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    thumbnailImage: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
    images: [{
      type: Schema.Types.ObjectId,
      ref: "Image",
    }],
    BannerImages: [{
      type: Schema.Types.ObjectId,
      ref: "Image",
    }],
    order: { type: Number, default: 0 },
    showInMenu: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
