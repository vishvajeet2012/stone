import mongoose, { Schema, Document, Model } from "mongoose";

export interface IImage extends Document {
  filename: string;
  slug: string;
  contentType: string;
  size: number;
  data: Buffer;
  url?: string;
  provider: "local-db" | "s3";
  isThumbnail?: boolean;
  isCategoryCard?: boolean;
  isProjectCard?: boolean;
  relatedCategory?: mongoose.Types.ObjectId;
  relatedProduct?: mongoose.Types.ObjectId;
  relatedProject?: mongoose.Types.ObjectId;
  relatedUser?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema<IImage> = new Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      index: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    data: {
      type: Buffer,
      required: function (this: IImage) {
        return this.provider === "local-db";
      },
    },
    url: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["local-db", "s3"],
      default: "local-db",
    },
    isThumbnail: { type: Boolean, default: false },
    isCategoryCard: { type: Boolean, default: false },
    isProjectCard: { type: Boolean, default: false },
    relatedCategory: { type: Schema.Types.ObjectId, ref: "Category" },
    relatedProduct: { type: Schema.Types.ObjectId, ref: "Product" },
    relatedProject: { type: Schema.Types.ObjectId, ref: "Project" },
    relatedUser: { type: Schema.Types.ObjectId, ref: "LamsourAdmin" },
  },
  { timestamps: true }
);

const ImageModel: Model<IImage> = mongoose.models.Image || mongoose.model<IImage>("Image", ImageSchema);
export default ImageModel;
