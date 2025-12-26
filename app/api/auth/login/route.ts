import { NextRequest, NextResponse } from "next/server";
import LamsourAdmin from "@/model/Admin";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }
        
        const user = await LamsourAdmin.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
        }

  
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET || "secret", 
            { expiresIn: "1d" }
        );

        return NextResponse.json({ 
            message: "Login successful", 
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin
            }
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}