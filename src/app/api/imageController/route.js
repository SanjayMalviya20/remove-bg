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






// export async function POST(req) {
//   try {
//     await middleware(req);
//     const clerkId = req.clerkId;
//     const user = await UserMOdel.findOne({ clerkId: clerkId });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     if (user?.creditBalance === 0) {
//       return NextResponse.json({ error: "You have no credits" }, { status: 400 });
//     }
//     const formData = await req.formData();
//     const file = formData.get("file"); // 'file' नाम से आ रही फ़ाइल लें
//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const uploadDir = path.join(process.cwd(), "src/uploads");
//     await fs.promises.mkdir(uploadDir, { recursive: true }); // डायरेक्टरी बनाएँ अगर मौजूद न हो
//     const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
//     await fs.promises.writeFile(filePath, buffer);

//     const fileStream = fs.createReadStream(filePath);

//     const form = new FormData();
//     form.append("image_file", fileStream);

//     const response = await axios.post("https://clipdrop-api.co/remove-background/v1", form, {
//       headers: {
//         'x-api-key':  process.env.ClipDrop_Api_KEY,
//       },
//       responseType: 'arraybuffer'
//     });

//     const data = response.data;

//     const base64String = Buffer.from(data, 'binary').toString('base64');
//     const url = `data:image/png;base64,${base64String}`;
//     await UserMOdel.updateOne({_id:user?._id},{$inc:{creditBalance:-1}})
//     return NextResponse.json({
//       message: "Image processed successfully",
//       url: url
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }