import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string; // Used for lookup instead of ID
  category: mongoose.Types.ObjectId;
  images: mongoose.Types.ObjectId[];
  description: string;
  technicalSpecifications?: {
    seriesName?: string;
    primaryColor?: string;
    thickness?: string;
    style?: string;
    wearLayer?: string;
    environmental?: string;
    radiantHeating?: string;
    additionalResources?: string;
  };
  specs: { label: string; value: string }[];
  applications: {
    flooring: { residential: boolean; commercial: boolean };
    wall: { residential: boolean; commercial: boolean };
  };
  finishes: { name: string; description?: string; image?: mongoose.Types.ObjectId }[];
  similarStyles: mongoose.Types.ObjectId[];
  isFeatured: boolean;
  isActive: boolean;
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
    finishes: [{ 
      name: String,
      description: String,
      image: { type: Schema.Types.ObjectId, ref: "Image" } 
    }],
    technicalSpecifications: {
      seriesName: String,
      primaryColor: String,
      thickness: String,
      style: String,
      wearLayer: String,
      environmental: String,
      radiantHeating: String,
      additionalResources: String,
    },
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
    similarStyles: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
