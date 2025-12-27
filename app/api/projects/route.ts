import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/model/project";
import { slugify } from "@/lib/utils";

export async function GET(_req: Request) {
  try {
    await dbConnect();
    const projects = await Project.find()
      .populate('category')
      .populate('products')
      .populate('images')
      .populate('BannerImages')
      .populate('gallery')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: projects });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

import { verifyAdmin } from "@/lib/auth-server";

export async function POST(req: Request) {
  try {
    await verifyAdmin();
    await dbConnect();
    const body = await req.json();

    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    }

    const project = await Project.create(body);

    // Link images back to project
    const ImageModel = require("@/model/image").default;

    if (project.images && project.images.length > 0) {
        await ImageModel.updateMany(
            { _id: { $in: project.images } },
            { relatedProject: project._id }
        );
    }

    if (project.BannerImages && project.BannerImages.length > 0) {
        await ImageModel.updateMany(
            { _id: { $in: project.BannerImages } },
            { relatedProject: project._id }
        );
    }

    if (project.gallery && project.gallery.length > 0) {
        await ImageModel.updateMany(
            { _id: { $in: project.gallery } },
            { relatedProject: project._id }
        );
    }

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 400 });
  }
}
