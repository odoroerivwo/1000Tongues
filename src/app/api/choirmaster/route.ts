import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ✅ Required fields for a choirmaster
const requiredFields = ["fullname", "email", "phoneNumber", "role"];

// ✅ GET — Fetch all choirmasters
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const choirmasters = await db
      .collection("choirmasters")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ choirmasters }, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch choirmasters", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST — Create a new choirmaster
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    // ✅ Validate required fields
    const missingFields = requiredFields.filter(
      (field) => !data[field] || data[field].toString().trim() === ""
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `The following fields are required: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // ✅ Check if choirmaster already exists by email
    const existing = await db.collection("choirmasters").findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        { message: "A choirmaster with this email already exists" },
        { status: 409 }
      );
    }

    // ✅ Prepare new choirmaster data
    const newChoirmaster = {
      fullname: data.fullname.trim(),
      email: data.email.trim().toLowerCase(),
      phoneNumber: data.phoneNumber.trim(),
      role: data.role.trim(),
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("choirmasters").insertOne(newChoirmaster);

    return NextResponse.json(
      { message: "Choirmaster added successfully", choirmaster: newChoirmaster },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create choirmaster", error: error.message },
      { status: 500 }
    );
  }
}
