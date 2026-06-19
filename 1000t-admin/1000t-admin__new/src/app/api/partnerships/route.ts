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
    // Destructure all expected fields from the form
    const { 
      organizationName, 
      organizationType, 
      contactName, 
      emailAddress, 
      phoneNumber, 
      partnershipLevel, 
      specificInterests, 
      message, 
      isPublic 
    } = body;

    // REMOVED: Strict validation checks. 
    // We allow submission even if some fields are empty as requested.

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

    // Check if email already exists (only if email is provided)
    if (emailAddress) {
      const existingPartnership = await db
        .collection('partnerships')
        .findOne({ emailAddress });

      if (existingPartnership) {
        return NextResponse.json(
          { message: 'This email is already registered with a partnership.' },
          { status: 409 }
        );
      }
    }

    // Create partnership object
    // Mapping form fields directly to DB fields
    const newPartnership = {
      organizationName,
      organizationType,
      contactName,
      emailAddress,
      phoneNumber,
      partnershipLevel,
      specificInterests,
      message,
      // Metadata
      status: 'Pending',
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