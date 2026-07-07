import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";
import nodemailer from "nodemailer";

// ✅ Force Next.js to fetch fresh data every time (Bypass Cache)
export const dynamic = 'force-dynamic';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    const client = await clientPromise;
    
    // ✅ Hardcoded to match the POST route and your actual database name
    const db = client.db("1000t-admin"); 

    const choristers = await db
      .collection("choristers")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      { choristers },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("❌ Error fetching choristers:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message || "Unknown error",
      },
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
      preferredHub,
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
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400, headers: corsHeaders }
      );
    }

    const client = await clientPromise;
    
    // ✅ Matches the GET route database name
    const db = client.db("1000t-admin");

    // ✅ Check if email already exists
    const existing = await db.collection("choristers").findOne({ email });
    if (existing) {
      console.log("⚠️ Email already exists:", email);
      return NextResponse.json(
        { message: "Email already exists" },
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
      preferredHub,
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

    // --- MAILING FEATURE START ---
    const userEmail = email;
    const clientFirstName = firstName || "Choir Member";

    if (userEmail) {
      try {
        const emailPort = Number(process.env.EMAIL_PORT);
        // Connect to your email server using your existing .env variables
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: emailPort,
          secure: emailPort === 465, // Use SSL/TLS on port 465, false for others (like 587)
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Construct the email
        const mailOptions = {
          from: `"1000 Tongues" <${process.env.EMAIL_USER}>`,
          to: userEmail,
          subject: "Registration Successful - Welcome to the Choir!",
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #0A192F;">Welcome to the 1000 Tongues Choir!</h2>
                <p>Hi ${clientFirstName},</p>
                <p>Your registration was successful, and your details have been safely received.</p>
                <p>We are absolutely thrilled to have you join us. We will be in touch soon with further details regarding rehearsals, schedules, and what to expect next.</p>
                <br/>
                <p>Best Regards,</p>
                <p><strong>The 1000 Tongues Team</strong></p>
            </div>
          `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`✅ Confirmation email successfully sent to: ${userEmail}`);
      } catch (mailErr: any) {
        console.error("❌ Failed to send confirmation email:", mailErr);
      }
    } else {
      console.log("⚠️ No email provided in submission, skipping confirmation email.");
    }
    // --- MAILING FEATURE END ---

    return NextResponse.json(
      {
        message: "Chorister registration successful!",
        chorister: { ...newChorister, _id: result.insertedId },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("🔥 Error creating chorister:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message || "Unknown error",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}