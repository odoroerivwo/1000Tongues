import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuthAdmin } from '@/lib/auth';

// GET - Fetch all partnerships
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
    
    const partnerships = await db
      .collection('partnerships')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ partnerships }, { status: 200 });
  } catch (error) {
    console.error('Error fetching partnerships:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new partnership
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, isPublic } = body;

    // Validation
    if (!name || !email || !phone || !organization) {
      return NextResponse.json(
        { message: 'All fields are required' },
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
    const existingPartnership = await db
      .collection('partnerships')
      .findOne({ email });

    if (existingPartnership) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create partnership
    const newPartnership = {
      name,
      email,
      phone,
      organization,
      status: 'Pending', // Default status for new registrations
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection('partnerships')
      .insertOne(newPartnership);

    return NextResponse.json(
      {
        message: 'Partnership registered successfully',
        partnership: { ...newPartnership, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating partnership:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}