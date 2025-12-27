import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategory?: mongoose.Types.ObjectId; // For hierarchy (e.g. Stone Collection -> Sandstone)
  type: "stone" | "service" | "collection";
  description?: string;
  image?: string;
  subCategories?: { label: string; href: string }[];
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
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    type: {
      type: String,
      enum: ["stone", "service", "collection"],
      default: "stone",
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    subCategories: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
