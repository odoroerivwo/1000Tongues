import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";

// ✅ Allow CORS for external frontend requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all origins (or replace with your frontend domain)
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// ✅ GET — Fetch all Choristers (Admin only)
export async function GET() {
  try {
    const admin = await getAuthAdmin();
    if (!admin) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: corsHeaders }
      );
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const choristers = await db
      .collection("choristers")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new NextResponse(
      JSON.stringify({ choristers }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("❌ Error fetching choristers:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
        error: error.message || "Unknown error",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST — Register new Chorister (Public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📥 Received Chorister registration:", body);

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      churchName,
      churchLocation,
      pastorName,
      musicalExperience,
      voiceRange,
      previousChoristerExperience,
      availableRehearsalDays,
      timeCommitment,
      dietaryRequirements,
      accessibilityNeeds,
      travelArrangements,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactPhone,
      emergencyContactEmail,
      termsAccepted,
      privacyPolicyAccepted,
      communicationConsent,
      photographyConsent,
    } = body;

    // ✅ Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !churchName) {
      console.log("❌ Missing required fields");
      return new NextResponse(
        JSON.stringify({ message: "Required fields missing" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    // ✅ Check if email already exists
    const existing = await db.collection("choristers").findOne({ email });
    if (existing) {
      console.log("⚠️ Email already exists:", email);
      return new NextResponse(
        JSON.stringify({ message: "Email already exists" }),
        { status: 409, headers: corsHeaders }
      );
    }

    // ✅ Build new Chorister document
    const newChorister = {
      fullName: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      email,
      phoneNumber,
      churchName,
      churchLocation,
      pastorName,
      musicalExperience,
      voiceRange,
      previousChoristerExperience,
      availableRehearsalDays,
      timeCommitment,
      dietaryRequirements,
      accessibilityNeeds,
      travelArrangements,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactPhone,
      emergencyContactEmail,
      termsAccepted: !!termsAccepted,
      privacyPolicyAccepted: !!privacyPolicyAccepted,
      communicationConsent: !!communicationConsent,
      photographyConsent: !!photographyConsent,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // ✅ Insert into MongoDB
    const result = await db.collection("choristers").insertOne(newChorister);
    console.log("✅ Chorister saved with ID:", result.insertedId);

    return new NextResponse(
      JSON.stringify({
        message: "Chorister registration successful!",
        chorister: { ...newChorister, _id: result.insertedId },
      }),
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("🔥 Error creating chorister:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
        error: error.message || "Unknown error",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
