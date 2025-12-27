import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    

    console.log("Contact form submission:", body);
    
    return NextResponse.json({ success: true, message: "Message received" });
  } catch (_error) {
    return NextResponse.json({ success: false, error: "Failed to process contact" }, { status: 500 });
  }
}