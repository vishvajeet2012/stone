import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/model/contact";
import { verifyAdmin } from "@/lib/auth-server";

// GET - List all contacts (Admin only)
export async function GET(req: Request) {
  try {
    await verifyAdmin();
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const subject = searchParams.get('subject');
    
    const filter: Record<string, string> = {};
    if (status && status !== 'all') filter.status = status;
    if (subject && subject !== 'all') filter.subject = subject;
    
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: contacts });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// POST - Create new contact (Public)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject || "General Inquiry",
      message: body.message,
      status: "new",
    });
    
    return NextResponse.json({ success: true, data: contact, message: "Message sent successfully" }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}