import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";

// GET - fetch all choirmasters (admin-only)
export async function GET(request: NextRequest) {
  try {
    const admin = await getAuthAdmin();
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const choirmasters = await db
      .collection("choirmasters")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ choirmasters }, { status: 200 });
  } catch (error) {
    console.error("Error fetching choirmasters:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// POST - create a new choirmaster (supports public or admin-created)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, isPublic } = body;

    // basic validation
    if (!name || !email || !phone || !role) {
      return NextResponse.json(
        { message: "Name, email, phone and role are required" },
        { status: 400 }
      );
    }

    // If not public registration, require admin
    if (!isPublic) {
      const admin = await getAuthAdmin();
      if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    // Prevent duplicate email
    const existing = await db.collection("choirmasters").findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 });
    }

    const newChoirmaster = {
      name,
      email,
      phone,
      role,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("choirmasters").insertOne(newChoirmaster);

    return NextResponse.json(
      {
        message: "Choirmaster created successfully",
        choirmaster: { ...newChoirmaster, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating choirmaster:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
