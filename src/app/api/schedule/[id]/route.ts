import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getAuthAdmin } from "@/lib/auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// ✅ Check Authentication
async function checkAuth() {
  const admin = await getAuthAdmin();
  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }
  return null;
}

// ✅ GET — Fetch single event (useful if you add an "Edit" modal later)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const event = await db
      .collection("schedule")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ event }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}

// ✅ PATCH — Update event details
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id } = await context.params;

  try {
    const updates = await request.json();
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const result = await db
      .collection("schedule")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updates, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ message: "Event updated successfully" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}

// ✅ DELETE — Remove an event
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const result = await db
      .collection("schedule")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}