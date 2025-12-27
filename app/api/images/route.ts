import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ImageModel from "@/model/image";
import { slugify } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { verifyAdmin } from "@/lib/auth-server";

export async function POST(req: Request) {
  try {
    const user: any = await verifyAdmin();
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = (file as any).name || "unknown";
    const contentType = file.type;
    const slug = slugify(filename.split(".")[0]) + "-" + Date.now();
    
    // Extract flags
    const isThumbnail = formData.get("isThumbnail") === "true";
    const isCategoryCard = formData.get("isCategoryCard") === "true";
    const isProjectCard = formData.get("isProjectCard") === "true";

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(buffer, {
      folder: "stone-app",
      public_id: slug,
    });

    const newImage = await ImageModel.create({
      filename,
      slug,
      contentType,
      size: file.size,
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      provider: "cloudinary",
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      isThumbnail,
      isCategoryCard,
      isProjectCard,
      relatedUser: user._id, 
    });

    return NextResponse.json({ 
      success: true, 
      slug: newImage.slug,
      url: newImage.url,
      _id: newImage._id
    }, { status: 201 });

  } catch (error: any) {
    console.error("Upload failed:", error?.message || error);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return NextResponse.json({ error: "Upload failed", details: error?.message }, { status: 500 });
  }
}

export async function GET() {
    try {
        await dbConnect();
        const images = await ImageModel.find({}, 'slug filename url contentType size createdAt width height');
        return NextResponse.json({ success: true, data: images });
    } catch (error) {
        console.error("Failed to fetch images:", error);
        return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}
