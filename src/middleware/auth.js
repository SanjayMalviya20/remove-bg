import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const token =req?.headers.get("token") 
    if(!token ){
        return NextResponse.json({error: "You are not logged in"}, {status:401})
    }
    try {
        const decodedToken = jwt.decode(token);
        // console.log(decodedToken)
        req.clerkId = decodedToken?.clerkId
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({error: "You are not logged in"}, {status:401})
    }
}