import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/model/blog";
import ImageModel from "@/model/image";
import { verifyAdmin } from "@/lib/auth-server";

// GET - Single blog by slug
export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    await dbConnect();
    const { slug } = params;
    const blog = await Blog.findOne({ slug, isPublished: true }).populate(
      "coverImage"
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT - Update blog (admin only)
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

    const blog = await Blog.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to update blog" },
      { status: 400 }
    );
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    await verifyAdmin();
    await dbConnect();
    const { slug } = params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Cleanup cover image
    if (blog.coverImage) {
      await ImageModel.findByIdAndDelete(blog.coverImage);
    }

    await Blog.findOneAndDelete({ slug });

    return NextResponse.json({ success: true, data: {} });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete blog" },
      { status: 400 }
    );
  }
}
