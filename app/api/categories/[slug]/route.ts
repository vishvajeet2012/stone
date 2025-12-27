import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/model/category";
import { verifyAdmin } from "@/lib/auth-server";
import ImageModel from "@/model/image";
import { menuCache, CACHE_KEYS } from "@/lib/cache";

export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    await dbConnect();
    const { slug } = params;
    const category = await Category.findOne({ slug })
      .populate('parentCategory')
      .populate('images')
      .populate('BannerImages');

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: category });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    await verifyAdmin();
    await dbConnect();
    const { slug } = params;
    const body = await req.json();

    const category = await Category.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    // Invalidate menu cache
    menuCache.invalidate(CACHE_KEYS.MENU);

    return NextResponse.json({ success: true, data: category });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    await verifyAdmin();
    await dbConnect();
    const { slug } = params;
    const category = await Category.findOne({ slug });

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    // Cascade delete images
    if (category.images && category.images.length > 0) {
      for (const imageId of category.images) {
        await ImageModel.findByIdAndDelete(imageId);
      }
    }
    
    // Cascade delete banner images
    if (category.BannerImages && category.BannerImages.length > 0) {
       for (const imageId of category.BannerImages) {
        await ImageModel.findByIdAndDelete(imageId);
      }
    }

    await Category.findOneAndDelete({ slug });

    // Invalidate menu cache
    menuCache.invalidate(CACHE_KEYS.MENU);

    return NextResponse.json({ success: true, data: {} });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to delete category" }, { status: 400 });
  }
}
