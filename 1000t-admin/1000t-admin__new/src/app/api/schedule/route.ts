import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// ✅ Verify admin access
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

// ✅ GET — Fetch all Schedule Events
export async function GET(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const events = await db
      .collection("schedule")
      .find({})
      .sort({ date: 1, startTime: 1 }) // Sort by soonest first
      .toArray();

    return NextResponse.json({ events }, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST — Create a new Event
export async function POST(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { title, eventType, date, startTime, endTime, location, description } = body;

    // Validate required fields
    if (!title || !eventType || !date || !startTime || !endTime) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400, headers: corsHeaders }
      );
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const newEvent = {
      title,
      eventType,
      date,
      startTime,
      endTime,
      location: location || "",
      description: description || "",
      status: "Upcoming",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("schedule").insertOne(newEvent);

    return NextResponse.json(
      {
        message: "Event created successfully!",
        event: { ...newEvent, _id: result.insertedId },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("🔥 Error creating event:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}