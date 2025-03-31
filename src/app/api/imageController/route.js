import { middleware } from "@/middleware/auth";
import UserMOdel from "@/models/userModel";

// import path from "path";
import { NextResponse } from "next/server";
import FormData from "form-data";
import axios from "axios";
// import fs from "fs";


export async function POST(req) {
  try {
    await middleware(req);
    const clerkId = req.clerkId;
    const user = await UserMOdel.findOne({ clerkId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user?.creditBalance === 0) {
      return NextResponse.json({ error: "You have no credits" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // API Call Without Saving File
    const form = new FormData();
    form.append("image_file", buffer, { filename: file?.name });

    const response = await axios.post("https://clipdrop-api.co/remove-background/v1", form, {
      headers: {
        'x-api-key': process.env.ClipDrop_Api_KEY,
        ...form.getHeaders(),
      },
      responseType: 'arraybuffer'
    });

    const base64String = Buffer.from(response.data, 'binary').toString('base64');
    const url = `data:image/png;base64,${base64String}`;

    await UserMOdel.updateOne({ _id: user._id }, { $inc: { creditBalance: -1 } });

    return NextResponse.json({
      message: "Image processed successfully",
      url,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
