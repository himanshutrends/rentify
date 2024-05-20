// src/app/api/properties/[id].js
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';
import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  await connectToDatabase();

  try {
    const property = await Property.findById(id).populate('user', 'firstName lastName email phone');
    if (!property) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: property }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const token = req.headers.get('authorization').split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await connectToDatabase();

    let property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (property.user.toString() !== userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    property = await Property.findByIdAndUpdate(id, await req.json(), {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ success: true, data: property }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const token = req.headers.get('authorization').split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await connectToDatabase();

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (property.user.toString() !== userId) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    await property.remove();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
