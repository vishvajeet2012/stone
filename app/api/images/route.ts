import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ImageModel from "@/model/image";
import { slugify } from "@/lib/utils";

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

    const newImage = await ImageModel.create({
      filename,
      slug,
      contentType,
      size: file.size,
      data: buffer,
      provider: "local-db",
      url: `/api/images/${slug}`,
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

  } catch (_error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET(_req: Request) {
    try {
        await dbConnect();
        const images = await ImageModel.find({}, 'slug filename url contentType size createdAt');
        return NextResponse.json({ success: true, data: images });
    } catch (_error) {
        return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}
