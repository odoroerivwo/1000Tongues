import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuthAdmin } from '@/lib/auth';

// POST - Create a new volunteer
export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      fullname,
      email,
      phone,
      lga,
      ward,
      pollingUnit,
      committee,
      voterStatus,
      gender,
      notes,
    } = body;

    // Validate required fields
    // if (!fullname || !email || !phone || !lga || !ward) {
    //   return NextResponse.json(
    //     { message: 'Missing required fields' },
    //     { status: 400 }
    //   );
    // }

    const client = await clientPromise;
    const db = client.db('1000t-admin');

    const volunteer = {
      fullname,
      email,
      phone,
      lga,
      ward,
      pollingUnit: pollingUnit || '',
      committee: committee || '',
      voterStatus: voterStatus || '',
      gender: gender || '',
      notes: notes || '',
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: (admin as any).username || 'Super Admin',
    };

    await db.collection('volunteers').insertOne(volunteer);

    return NextResponse.json(
      { message: 'Volunteer created successfully' },
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

// GET - Fetch all volunteers
export async function GET() {
  try {
    const admin = await getAuthAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db('1000t-admin');

    const volunteers = await db
      .collection('volunteers')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
