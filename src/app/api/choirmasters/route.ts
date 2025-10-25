import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuthAdmin } from '@/lib/auth';

// GET - Fetch all choirmasters
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
    
    const choirmasters = await db
      .collection('choirmasters')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ choirmasters }, { status: 200 });
  } catch (error) {
    console.error('Error fetching choirmasters:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new choirmaster
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, isPublic } = body;

    // Validation
    if (!name || !email || !phone || !role) {
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
    const existingChoirmaster = await db
      .collection('choirmasters')
      .findOne({ email });

    if (existingChoirmaster) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create choirmaster
    const newChoirmaster = {
      name,
      email,
      phone,
      role,
      status: 'Pending', // Default status for new registrations
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection('choirmasters')
      .insertOne(newChoirmaster);

    return NextResponse.json(
      {
        message: 'Choirmaster registered successfully',
        choirmaster: { ...newChoirmaster, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating choirmaster:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}