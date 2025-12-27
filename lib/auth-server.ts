import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import LamsourAdmin from "@/model/Admin";

export async function verifyAdmin() {
  await dbConnect();
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    
  
    const user = await LamsourAdmin.findById(decoded.id).select("-password");
    
    if (!user || !user.isAdmin) {
       throw new Error("Unauthorized: Invalid admin credentials");
    }

    return user;
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
}
