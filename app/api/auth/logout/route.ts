import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({ 
            message: "Logout successful",
            success: true 
        }, { status: 200 });

        // Clear the cookie by setting maxAge to 0
        response.cookies.set("auth_token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
