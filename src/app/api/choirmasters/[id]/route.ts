import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getAuthAdmin } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// PATCH - Update choirmaster status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthAdmin();
    
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Await params to get the id
    const { id } = await params;

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { message: 'Status is required' },
        { status: 400 }
      );
    }

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status value' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection('choirmasters')
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status,
            updatedAt: new Date(),
            updatedBy: admin.adminId,
          },
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Choirmaster not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Status updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating choirmaster:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete choirmaster
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthAdmin();
    
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Await params to get the id
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection('choirmasters')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Choirmaster not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Choirmaster deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting choirmaster:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}