import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Verify Token
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

        // 2. Get Input
        const body = await req.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
             return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // 3. Find User
        const user = await LamsourAdmin.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // 4. Validate Current Password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
        }

        // 5. Hash New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 6. Update
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
