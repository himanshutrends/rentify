// src/app/api/properties/like.js
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { propertyId } = await req.json();

  try {
    await connectToDatabase();

    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    property.likes += 1;
    await property.save();

    return NextResponse.json({ success: true, data: property }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
