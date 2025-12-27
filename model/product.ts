import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string; // Used for lookup instead of ID
  category: mongoose.Types.ObjectId;
  images: mongoose.Types.ObjectId[];
  description: string;
  specs: { label: string; value: string }[];
  applications: {
    flooring: { residential: boolean; commercial: boolean };
    wall: { residential: boolean; commercial: boolean };
  };
  finishes: { name: string; image?: mongoose.Types.ObjectId }[];
  trims: {
    name: string;
    dimensions: string;
    sku: string;
    image: mongoose.Types.ObjectId;
  }[];
  similarStyles: mongoose.Types.ObjectId[];
  isFeatured: boolean;
  menuOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
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
      required: [true, "Product must belong to a category"],
    },
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    description: { type: String, required: true },
    specs: [{ label: String, value: String }],
    applications: {
      flooring: {
        residential: { type: Boolean, default: true },
        commercial: { type: Boolean, default: false },
      },
      wall: {
        residential: { type: Boolean, default: true },
        commercial: { type: Boolean, default: false },
      },
    },
    finishes: [{ 
      name: String, 
      image: { type: Schema.Types.ObjectId, ref: "Image" } 
    }],
    trims: [{ 
      name: String, 
      dimensions: String, 
      sku: String, 
      image: { type: Schema.Types.ObjectId, ref: "Image" } 
    }],
    similarStyles: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    isFeatured: { type: Boolean, default: false },
    menuOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
