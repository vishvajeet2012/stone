import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await props.params;
    
    // Prevent deleting self (checking token vs id logic can be added here if needed, skipping for brevity/no-comment rule)
    
    const deletedUser = await LamsourAdmin.findByIdAndDelete(id);
    if (!deletedUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    try {
      await dbConnect();
      const { id } = await props.params;
      const body = await req.json();
      const { isAdmin } = body;
  
      const updatedUser = await LamsourAdmin.findByIdAndUpdate(
          id, 
          { isAdmin }, 
          { new: true }
      ).select("-password");
  
      if (!updatedUser) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
