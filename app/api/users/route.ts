import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await LamsourAdmin.find({}).select("-password").sort({ createdAt: -1 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
