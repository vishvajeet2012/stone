import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { fullName, email, password } = body;

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields (fullName, email, password) are required" },
        { status: 400 }
      );
    }


    const existingUser = await LamsourAdmin.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    const newUser = await LamsourAdmin.create({
      fullName,
      email,
      password: hashedPassword,
      isAdmin: true, // Auto-approve as admin for this specific use case 
    });

    return NextResponse.json(
      {
        message: "Admin registered successfully",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}