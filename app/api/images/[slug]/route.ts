import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ImageModel from "@/model/image";

export async function GET(
  _req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await props.params;
    await dbConnect();
    const { slug } = params;

    const image = await ImageModel.findOne({ slug });

    if (!image || !image.data) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", image.contentType);
    headers.set("Content-Length", image.size.toString());
    // Cache for 1 year (immutable images - slug-based)
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(image.data as any, {
      status: 200,
      headers,
    });

  } catch (_error) {
    return NextResponse.json({ error: "Failed to retrieve image" }, { status: 500 });
  }
}
