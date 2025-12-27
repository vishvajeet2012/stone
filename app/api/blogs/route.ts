import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/model/blog";
import { verifyAdmin } from "@/lib/auth-server";

// GET - List all published blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({ isPublished: true })
      .populate("coverImage")
      .sort({ publishedAt: -1 });

    return NextResponse.json({ success: true, data: blogs });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST - Create new blog (admin only)
export async function POST(req: Request) {
  try {
    await verifyAdmin();
    await dbConnect();

    const body = await req.json();
    const blog = await Blog.create(body);

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 400 }
    );
  }
}
