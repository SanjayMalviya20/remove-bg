import connectDB from "@/lib/dbConnection"
import UserMOdel from "@/models/userModel"
import { NextResponse } from "next/server"

await connectDB()
export async function GET(req) {
    const users = await UserMOdel.create({
        firstname: "Sanjay",
        lastname: "Pandey",
        email: "tV7YJ@example.com",
        image:"https://sam.png",
        clerkId:"clerkId"
    })
    return NextResponse.json({users})
}