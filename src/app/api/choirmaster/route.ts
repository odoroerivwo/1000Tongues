import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getAuthAdmin();
    if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const client = await clientPromise;
    const db = client.db();
    const choirmasters = await db.collection("choirmasters").find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ choirmasters }, { status: 200 });
  } catch (error) {
    console.error("Error fetching choirmasters:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthAdmin();
    if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, email, phone, role } = await request.json();

    if (!name || !email || !phone || !role) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const existing = await db.collection("choirmasters").findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "A choirmaster with this email already exists" }, { status: 400 });
    }

    const newChoirmaster = {
      name,
      email,
      phone,
      role,
      status: "Pending",
      createdAt: new Date(),
    };

    await db.collection("choirmasters").insertOne(newChoirmaster);

    return NextResponse.json({ message: "Choirmaster saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving choirmaster:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
