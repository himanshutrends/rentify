// src/app/api/properties/interested.js
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';
import User from '@/lib/models/User';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { propertyId } = await req.json();

  try {
    const token = req.headers.get('authorization').split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await connectToDatabase();

    const property = await Property.findById(propertyId);
    const buyer = await User.findById(userId);

    if (!property || !buyer) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // Assuming that the seller's user ID is stored in the property document
    const seller = await User.findById(property.user);

    if (!seller) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    // Send seller details to the buyer (e.g., via email or response)
    // Here you can send email notifications using any email service like nodemailer

    return NextResponse.json({
      success: true,
      seller: {
        email: seller.email,
        phone: seller.phone,
        name: `${seller.firstName} ${seller.lastName}`
      }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
