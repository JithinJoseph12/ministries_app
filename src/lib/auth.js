import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "./models/User";
import { connectDB } from "./mongodb";

export async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret_please_change"
    );

    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");
    
    return user;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
