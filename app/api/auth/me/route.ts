import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();


    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    try {

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");


      const user = await LamsourAdmin.findById(decoded.id).select("-password"); 
      
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
