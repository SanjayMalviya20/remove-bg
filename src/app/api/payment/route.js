import connectDB from "@/lib/dbConnection";
import { middleware } from "@/middleware/auth";
import UserMOdel from "@/models/userModel";
import { NextResponse } from "next/server";
import Stripe from "stripe";

connectDB()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    await middleware(req)
    const plan = await req.nextUrl.searchParams.get('plan');
    // console.log(plan)
    const  clerkId  = req.clerkId;
    try {
        if(!plan){
            return NextResponse.json({msg:"Please select a plan"})
        }
        const userdata =await UserMOdel.findOne({clerkId})
        if(!userdata){
            return NextResponse.json({msg:"you are not loggin"})
        }
        console.log(userdata)
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {

                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: plan==='Basic' ? 'Basic' : plan==='Premium' ? 'Premium' : 'Enterprise',
                            metadata: {
                                amount: plan==='Basic' ? 50 : plan==='Premium' ? 250 : 500 * 100,
                                plan: plan,
                                product_name: plan==='Basic' ? 'Basic' : plan==='Premium' ? 'Premium' : 'Enterprise',
                                description: plan==='Basic' ? 'Basic plan' : plan==='Premium' ? 'Premium plan' : 'Enterprise plan',
                            }

                        },
                        unit_amount:  plan==='Basic' ? 50 * 100 : plan==='Premium' ? 250 * 100 : 500 * 100, // Multiply by 100 to convert to paise
                    },
                    quantity: 1,
                },
                
            ],
            metadata: {
                amount: plan==='Basic' ? 50 * 100 : plan==='Premium' ? 250 * 100 : 500 * 100, // Multiply by 100 to convert to paise
                plan: plan,
                order_id: crypto.randomUUID(),
            }, 
            mode: 'payment',
            payment_method_types: ['card'],
           
            success_url: 'https://remove-bg-hdc8.vercel.app/success',
            cancel_url: 'https://remove-bg-hdc8.vercel.app/cancel',
        });

        // Update user credit balance based on plan
        let credits = 0;
        switch (plan) {
            case 'Basic':
                credits = 30;
                break;
            case 'Premium':
                credits = 100;
                break;
            case 'Enterprise':
                credits = 400;
                break;
            default:
                break;
        }
        await UserMOdel.updateOne({ _id: userdata?._id }, { $inc: { creditBalance: credits } });
        console.log(credits)

        return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }
}