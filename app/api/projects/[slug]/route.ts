import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/model/project";
import { verifyAdmin } from "@/lib/auth-server";
import ImageModel from "@/model/image";

export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  try {
    await dbConnect();
    const { slug } = params;
    const project = await Project.findOne({ slug })
      .populate('category')
      .populate('products')
      .populate('image')
      .populate('gallery');

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 });
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

    const project = await Project.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 400 });
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
    const project = await Project.findOne({ slug });

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const ImageModel = require("@/model/image").default;

    // Cleanup main images
    if (project.images && project.images.length > 0) {
      for (const imageId of project.images) {
        await ImageModel.findByIdAndDelete(imageId);
      }
    }
    
    // Cleanup banner images
    if (project.BannerImages && project.BannerImages.length > 0) {
      for (const imageId of project.BannerImages) {
        await ImageModel.findByIdAndDelete(imageId);
      }
    }

    // Cleanup gallery images
    if (project.gallery && project.gallery.length > 0) {
      for (const imageId of project.gallery) {
        await ImageModel.findByIdAndDelete(imageId);
      }
    }

    await Project.findOneAndDelete({ slug });

    return NextResponse.json({ success: true, data: {} });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 400 });
  }
}
