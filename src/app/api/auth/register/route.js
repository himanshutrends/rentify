// src/app/api/auth/register.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { firstName, lastName, email, phone, password, isSeller } = await req.json();

  try {
    await connectToDatabase();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      isSeller,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
