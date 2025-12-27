import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/model/contact";
import { verifyAdmin } from "@/lib/auth-server";

// GET - Get single contact
export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await verifyAdmin();
    await dbConnect();
    const { id } = params;
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: contact });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch contact" }, { status: 500 });
  }
}

// PUT - Update contact status
export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await verifyAdmin();
    await dbConnect();
    const { id } = params;
    const body = await req.json();
    
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: contact });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to update contact" }, { status: 500 });
  }
}

// DELETE - Delete contact
export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await verifyAdmin();
    await dbConnect();
    const { id } = params;
    
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to delete contact" }, { status: 500 });
  }
}
