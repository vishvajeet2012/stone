import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ImageModel from "@/model/image";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { verifyAdmin } from "@/lib/auth-server";

export async function GET(
  _req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await props.params;
    await dbConnect();
    const { slug } = params;

    const image = await ImageModel.findOne({ slug });

    if (!image || !image.url) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Redirect to Cloudinary URL
    return NextResponse.redirect(image.url, {
      status: 302,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    });

  } catch (error) {
    console.error("Failed to retrieve image:", error);
    return NextResponse.json({ error: "Failed to retrieve image" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  try {
    await verifyAdmin();
    const params = await props.params;
    await dbConnect();
    const { slug } = params;

    const image = await ImageModel.findOne({ slug });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    if (image.publicId) {
      await deleteFromCloudinary(image.publicId);
    }

    // Delete from database
    await ImageModel.findByIdAndDelete(image._id);

    return NextResponse.json({ success: true, message: "Image deleted" });

  } catch (error) {
    console.error("Failed to delete image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
