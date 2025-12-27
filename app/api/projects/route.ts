import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project, { IProject } from "@/model/project";
import ImageModel from "@/model/image";
import { slugify } from "@/lib/utils";
import { verifyAdmin } from "@/lib/auth-server";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find()
      .populate('category')
      .populate('products')
      .populate('image')
      .populate('gallery')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: projects });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdmin();
    await dbConnect();
    const body = await req.json();

    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    }

    const project = await Project.create(body) as unknown as IProject;

    // Link image to project
    if (body.image) {
      await ImageModel.findByIdAndUpdate(body.image, { relatedProject: project._id });
    }

    // Link gallery images to project
    if (body.gallery && body.gallery.length > 0) {
      await ImageModel.updateMany(
        { _id: { $in: body.gallery } },
        { relatedProject: project._id }
      );
    }

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 400 });
  }
}
