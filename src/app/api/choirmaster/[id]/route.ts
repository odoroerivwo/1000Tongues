import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";
import { ObjectId } from "mongodb";

// ✅ Required fields for Choirmaster
const requiredFields = ["fullname", "email", "phoneNumber", "role"];

// ✅ GET — Fetch a single choirmaster by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const choirmaster = await db
      .collection("choirmasters")
      .findOne({ _id: new ObjectId(id) });

    if (!choirmaster) {
      return NextResponse.json({ message: "Choirmaster not found" }, { status: 404 });
    }

    return NextResponse.json({ choirmaster }, { status: 200 });
  } catch (error) {
    console.error("Error fetching choirmaster:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ PATCH — Update choirmaster details or status
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const admin = await getAuthAdmin();
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { status, ...updates } = data;

    const allowedStatuses = ["Pending", "Accepted", "Rejected"];
    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // ✅ Validate only if updating full details (not just status)
    if (Object.keys(updates).length > 0) {
      for (const field of requiredFields) {
        if (!updates[field] || updates[field].toString().trim() === "") {
          return NextResponse.json(
            { message: `Field "${field}" is required.` },
            { status: 400 }
          );
        }
      }
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const updateDoc: Record<string, any> = {
      ...updates,
      updatedAt: new Date(),
      updatedBy: (admin as any).adminId ?? null,
    };
    if (status) updateDoc.status = status;

    const result = await db
      .collection("choirmasters")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Choirmaster not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Choirmaster updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating choirmaster:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ DELETE — Remove a choirmaster
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const admin = await getAuthAdmin();
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const result = await db
      .collection("choirmasters")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Choirmaster not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Choirmaster deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting choirmaster:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
