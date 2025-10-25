import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuthAdmin } from '@/lib/auth';

// GET - Fetch all volunteers
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
    
    const volunteers = await db
      .collection('volunteers')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ volunteers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new volunteer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, department, isPublic } = body;

    // Validation
    if (!name || !email || !phone || !department) {
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
    const existingVolunteer = await db
      .collection('volunteers')
      .findOne({ email });

    if (existingVolunteer) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create volunteer
    const newVolunteer = {
      name,
      email,
      phone,
      department,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection('volunteers')
      .insertOne(newVolunteer);

    return NextResponse.json(
      {
        message: 'Volunteer registered successfully',
        volunteer: { ...newVolunteer, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating volunteer:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}