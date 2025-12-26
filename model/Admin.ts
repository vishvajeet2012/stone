import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IAdmin>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "LamsourAdmins",
  }
);

export default mongoose.models.LamsourAdmin || mongoose.model<IAdmin>("LamsourAdmin", UserSchema);