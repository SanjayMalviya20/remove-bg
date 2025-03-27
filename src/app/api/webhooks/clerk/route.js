import { Webhook } from "svix";
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';
import connectDB from '@/lib/dbConnection';
import UserMOdel from '@/models/userModel';
import { NextResponse } from "next/server";

connectDB();

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt

  // Verify payload with headers
  try {
    evt = await wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data
    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstname: first_name,
      lastname: last_name,
      image: image_url
    }
    const usercreated = await UserMOdel.create(user)
    // if (usercreated) {
    //   await clerkClient.users.updateUserMetadata(id, {
    //     publicMetadata: {
    //       userId: usercreated._id
    //     }
    //   })
    // }
    return NextResponse.json({
      message: 'User created',
      status: 200,
      usercreated
    })
  }
  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data
    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstname: first_name,
      lastname: last_name,
      image: image_url
    }
    const updateduser = await UserMOdel.findOneAndUpdate({ clerkId: id }, user)
    if (updateduser) {
      return NextResponse.json({
        message: 'User updated',
        status: 200,
      })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data
    const deleteduser = await UserMOdel.findOneAndDelete({ clerkId: id })
    if (deleteduser) {
      return NextResponse.json({
        message: 'User deleted',
        status: 200,
      })
    }
  }
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  // console.log('Webhook payload:', body)

  return new Response('Webhook received', { status: 200 })
}
