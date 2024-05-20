// src/app/api/properties/route.js
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  try {
    const properties = await Property.find({}).populate('user', 'firstName lastName email phone');
    return NextResponse.json({ success: true, data: properties }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing');
    }

    console.log('Token:', token); // Log the token

    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const body = await request.json();

    const property = await Property.create({ ...body, user: userId });
    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/properties:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
