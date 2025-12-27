import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/model/category";
import { slugify } from "@/lib/utils";
import ImageModel from "@/model/image";

export async function GET(_req: Request) {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 });
  }
}

import { verifyAdmin } from "@/lib/auth-server";

export async function POST(req: Request) {
  try {
    await verifyAdmin();
    await dbConnect();
    const body = await req.json();

    if (!body.slug && body.name) {
      body.slug = slugify(body.name);
    }

    const category: any = await Category.create(body);

    // Link images back to category

    if (body.images && body.images.length > 0) {
      await ImageModel.updateMany(
        { _id: { $in: body.images } },
        { relatedCategory: category._id }
      );
    }
    
    if (body.BannerImages && body.BannerImages.length > 0) {
      await ImageModel.updateMany(
        { _id: { $in: body.BannerImages } },
        { relatedCategory: category._id }
      );
    }

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 400 });
  }
}
