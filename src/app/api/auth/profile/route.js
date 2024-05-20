// src/app/api/auth/profile.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectToDatabase();

  try {
    const token = req.headers.get('authorization').split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectToDatabase();

  try {
    const token = req.headers.get('authorization').split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const updatedUser = await User.findByIdAndUpdate(userId, await req.json(), { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
