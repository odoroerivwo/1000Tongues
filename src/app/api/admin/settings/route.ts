import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function PATCH(request: NextRequest) {
  try {
    const adminSession = await getAuthAdmin();
    
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    // 1. Update Password Flow
    if (action === "updatePassword") {
      const { current, new: newPassword } = body;

      // Fetch the actual admin record from the DB
      const adminRecord = await db.collection("admins").findOne({ email: adminSession.email });
      if (!adminRecord) {
        return NextResponse.json({ message: "Admin not found in database" }, { status: 404 });
      }

      // Verify current password
      const isValid = await bcrypt.compare(current, adminRecord.password);
      if (!isValid) {
        return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
      }

      // Hash new password and update
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.collection("admins").updateOne(
        { email: adminSession.email },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );

      return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    }

    // 2. Update Preferences & Notifications Flow
    if (action === "updateSettings") {
      const { notifications, preferences } = body;

      await db.collection("admins").updateOne(
        { email: adminSession.email },
        { 
          $set: { 
            notifications, 
            preferences, 
            updatedAt: new Date() 
          } 
        }
      );

      return NextResponse.json({ message: "Settings saved successfully" }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });

  } catch (error: any) {
    console.error("Error updating admin settings:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}   