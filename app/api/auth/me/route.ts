import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get token from Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify Token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

      // Find user
      const user = await LamsourAdmin.findById(decoded.id).select("-password"); // Exclude password
      
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
