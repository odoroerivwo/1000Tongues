import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "churchName",
      "emergencyContactName",
      "emergencyContactRelationship",
      "emergencyContactPhone",
      "emergencyContactEmail",
      "termsAccepted",
      "privacyPolicyAccepted"
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!data.termsAccepted || !data.privacyPolicyAccepted) {
      return NextResponse.json(
        { message: "You must accept terms and privacy policy" },
        { status: 400 }
      );
    }

    // If form is not public, check admin authentication
    if (!data.isPublic) {
      const admin = await getAuthAdmin();
      if (!admin) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    const client = await clientPromise;
    const db = client.db();

    // Prevent duplicate registrations by email
    const existing = await db.collection("choirmasters").findOne({
      email: data.email
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const newEntry = {
      ...data,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("choirmasters").insertOne(newEntry);

    return NextResponse.json(
      { message: "Registration successful", id: result.insertedId },
      { status: 201 }
    );

  } catch (error) {
    console.error("Choirmaster Registration Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await getAuthAdmin();
    
    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const choirmasters = await db
      .collection("choirmasters")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ choirmasters }, { status: 200 });

  } catch (error) {
    console.error("Error fetching choirmasters:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
