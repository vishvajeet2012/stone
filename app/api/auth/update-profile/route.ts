import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Verify Token from Cookie
        const token = req.cookies.get("auth_token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        let decoded: any;
        try {
             decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        } catch (err) {
            return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
        }

        // 2. Get Data Body
        const body = await req.json();
        const { fullName, email } = body;

        // 3. Update User
        // Note: If updating email, check if it already exists for another user if needed.
        // For simplicity assuming email is not changed often or checking unique here.
        if (email) {
            const existingUser = await LamsourAdmin.findOne({ email, _id: { $ne: decoded.id } });
            if (existingUser) {
                 return NextResponse.json({ message: "Email already in use" }, { status: 400 });
            }
        }

        const updatedUser = await LamsourAdmin.findByIdAndUpdate(
            decoded.id,
            { 
                $set: { 
                    ...(fullName && { fullName }),
                    ...(email && { email })
                } 
            },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Profile updated successfully", 
            user: updatedUser 
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
