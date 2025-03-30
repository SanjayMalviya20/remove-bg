import connectDB from "@/lib/dbConnection";
import { middleware } from "@/middleware/auth";
import UserMOdel from "@/models/userModel";
import { NextResponse } from "next/server";
connectDB()
export async function GET(req, res) {
    await middleware(req, res)
    const clerkId = req.clerkId
    if (!clerkId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }
    // console.log(clerkId)
    const user = await UserMOdel.findOne({ clerkId });
    return NextResponse.json({ creadits: user?.creditBalance });
}