import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/model/product";
import ImageModel from "@/model/image";
import { slugify } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category');
    
    const filter = categoryId ? { category: categoryId } : {};
    const products = await Product.find(filter)
      .populate('category')
      .populate('images')
      .populate('finishes.image')
      .populate('trims.image');
    
    return NextResponse.json({ success: true, data: products });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
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

    const product: any = await Product.create(body);

    // Link images back to product
    
    // Main images
    if (body.images && body.images.length > 0) {
      await ImageModel.updateMany(
        { _id: { $in: body.images } },
        { relatedProduct: product._id }
      );
    }

    // Finishes images
    if (body.finishes) {
      for (const finish of body.finishes) {
        if (finish.image) {
           await ImageModel.findByIdAndUpdate(finish.image, { relatedProduct: product._id });
        }
      }
    }

    // Trims images
    if (body.trims) {
      for (const trim of body.trims) {
        if (trim.image) {
           await ImageModel.findByIdAndUpdate(trim.image, { relatedProduct: product._id });
        }
      }
    }

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 400 });
  }
}
