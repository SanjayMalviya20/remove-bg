import connectDB from "@/lib/dbConnection";
import { middleware } from "@/middleware/auth";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto"; // Import crypto module

connectDB();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    await middleware(req);

    const plan = req.nextUrl.searchParams.get("plan");
    const clerkId = req.clerkId;

    try {
        // Validate plan
        const plans = {
            Basic: { price: 50, credits: 30, description: "Basic plan" },
            Premium: { price: 250, credits: 100, description: "Premium plan" },
            Enterprise: { price: 500, credits: 200, description: "Enterprise plan" },
        };

        if (!plan || !plans[plan]) {
            return NextResponse.json({ msg: "Invalid or missing plan" }, { status: 400 });
        }

        // Fetch user data
        const userdata = await UserModel.findOne({ clerkId });
        if (!userdata) {
            return NextResponse.json({ msg: "User not logged in" }, { status: 401 });
        }

        console.log(userdata);

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
                userId: userdata._id.toString(), // Pass user ID for webhook processing
            },
            mode: "payment",
            payment_method_types: ["card"],
            success_url: "https://remove-bg-hdc8.vercel.app/success",
            cancel_url: "https://remove-bg-hdc8.vercel.app/",
        });

        return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error) {
        console.error("Error creating checkout session:", error.message);
        return NextResponse.json(
            { error: "Failed to create checkout session", details: error.message },
            { status: 500 }
        );
    }
}

// Webhook to handle payment status
export async function POST_webhook(req, res) {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        const rawBody = await req.text();
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // Update user credit balance
        const plan = session.metadata.plan;
        const userId = session.metadata.userId;

        const plans = {
            Basic: { credits: 30 },
            Premium: { credits: 100 },
            Enterprise: { credits: 200 },
        };

        if (plans[plan]) {
            await UserModel.updateOne(
                { _id: userId },
                { $inc: { creditBalance: plans[plan].credits } }
            );
            // console.log(`Credits added: ${plans[plan].credits} for user ${userId}`);
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}