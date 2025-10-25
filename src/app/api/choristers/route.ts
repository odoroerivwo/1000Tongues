import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuthAdmin } from '@/lib/auth';

// GET - Fetch all choristers
export async function GET(request: NextRequest) {
  try {
    const admin = await getAuthAdmin();
    
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    
    const choristers = await db
      .collection('choristers')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ choristers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching choristers:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new chorister
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, voicePart, dateOfBirth, address, isPublic } = body;

    // Validation
    if (!name || !email || !phone || !voicePart) {
      return NextResponse.json(
        { message: 'Name, email, phone, and voice part are required' },
        { status: 400 }
      );
    }

    // If not public registration, check for admin authentication
    if (!isPublic) {
      const admin = await getAuthAdmin();
      if (!admin) {
        return NextResponse.json(
          { message: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if email already exists
    const existingChorister = await db
      .collection('choristers')
      .findOne({ email });

    if (existingChorister) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create chorister
    const newChorister = {
      name,
      email,
      phone,
      voicePart,
      dateOfBirth: dateOfBirth || null,
      address: address || '',
      status: 'Pending', // Default status for new registrations
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection('choristers')
      .insertOne(newChorister);

    return NextResponse.json(
      {
        message: 'Chorister registered successfully',
        chorister: { ...newChorister, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating chorister:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}