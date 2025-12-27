import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/model/product";
import ImageModel from "@/model/image";
import { verifyAdmin } from "@/lib/auth-server";

export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    await dbConnect();
    const { slug } = await params;
    const product = await Product.findOne({ slug })
      .populate('category')
      .populate('images')
      .populate('finishes.image')
      .populate('trims.image');
    
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
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

    const product = await Product.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Link images back to product
    
    // Main images
    if (product.images && product.images.length > 0) {
      await ImageModel.updateMany(
        { _id: { $in: product.images } },
        { relatedProduct: product._id }
      );
    }

    // Finishes images
    if (product.finishes) {
      for (const finish of product.finishes) {
        if (finish.image) {
           await ImageModel.findByIdAndUpdate(finish.image, { relatedProduct: product._id });
        }
      }
    }

    // Trims images
    if (product.trims) {
      for (const trim of product.trims) {
        if (trim.image) {
           await ImageModel.findByIdAndUpdate(trim.image, { relatedProduct: product._id });
        }
      }
    }

    return NextResponse.json({ success: true, data: product });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 400 });
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
    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Cleanup main images
    if (product.images && product.images.length > 0) {
      for (const imageId of product.images) {
        await ImageModel.findByIdAndDelete(imageId);
      }
    }

    // Cleanup finish images
    if (product.finishes) {
      for (const finish of product.finishes) {
        if (finish.image) {
            await ImageModel.findByIdAndDelete(finish.image);
        }
      }
    }

    // Cleanup trim images
    if (product.trims) {
        for (const trim of product.trims) {
          if (trim.image) {
              await ImageModel.findByIdAndDelete(trim.image);
          }
        }
    }

    await Product.findOneAndDelete({ slug });

    return NextResponse.json({ success: true, data: {} });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 400 });
  }
}
