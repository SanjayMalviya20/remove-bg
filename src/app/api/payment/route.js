import connectDB from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto"; // Import crypto module
import UserModel from "@/models/userModel";
import { middleware } from "@/middleware/auth";

connectDB();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plans = {
    Basic: { price: 50, credits: 30, description: "Basic plan" },
    Premium: { price: 250, credits: 100, description: "Premium plan" },
    Enterprise: { price: 500, credits: 200, description: "Enterprise plan" },
};

export async function POST(req, res) {
    await middleware(req);

    const plan = req.nextUrl.searchParams.get("plan");
    const clerkId = req.clerkId;

    try {
        // Validate plan
        if (!plan || !plans[plan]) {
            return NextResponse.json({ msg: "Invalid or missing plan" }, { status: 400 });
        }

        // Fetch user data
        const userdata = await UserModel.findOne({ clerkId });
        if (!userdata) {
            return NextResponse.json({ msg: "User not logged in" }, { status: 401 });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: plan,
                            description: plans[plan].description,
                        },
                        unit_amount: plans[plan].price * 100, // Convert to paise
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                amount: plans[plan].price * 100,
                plan: plan,
                order_id: crypto.randomUUID(),
                userId: userdata._id.toString(), // Pass user ID for verification
            },
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `https://remove-bg-hdc8.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
            // Replace with your success URL
            cancel_url: "https://remove-bg-hdc8.vercel.app/",
        });

        return NextResponse.json({ url: session.url, sessionId: session.id }, { status: 200 });
    } catch (error) {
        console.error("Error creating checkout session:", error.message);
        return NextResponse.json(
            { error: "Failed to create checkout session", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const plan = session.metadata.plan;
            const userId = session.metadata.userId;

            if (!plans[plan]) {
                return NextResponse.json({ error: "Invalid plan in session metadata" }, { status: 400 });
            }

            // Update user credit balance
            await UserModel.updateOne(
                { _id: userId },
                { $inc: { creditBalance: plans[plan].credits } }
            );

            console.log("success",""+plans[plan].credits)
            return NextResponse.json({ success: true, credits: plans[plan].credits });
        }

        return NextResponse.json({ success: false, msg: "Payment not completed" }, { status: 400 });
    } catch (error) {
        console.error("Error verifying payment:", error.message);
        return NextResponse.json(
            { error: "Failed to verify payment", details: error.message },
            { status: 500 }
        );
    }
}