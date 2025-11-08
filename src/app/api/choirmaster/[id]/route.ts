import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";
import { ObjectId } from "mongodb";

type Params = { params: { id: string } };

// ✅ GET - Fetch all choirmasters
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");
    const choirmasters = await db.collection("choirmasters").find({}).toArray();

    return NextResponse.json({ choirmasters }, { status: 200 });
  } catch (error) {
    console.error("Error fetching choirmasters:", error);
    return NextResponse.json({ message: "Failed to fetch choirmasters" }, { status: 500 });
  }
}

// ✅ POST - Add a new choirmaster
export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, role } = await request.json();

    if (!name || !email || !phone || !role) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const newChoirmaster = {
      name,
      email,
      phone,
      role,
      status: "Pending",
      createdAt: new Date(),
    };

    await db.collection("choirmasters").insertOne(newChoirmaster);

    return NextResponse.json(
      { message: "Choirmaster saved successfully", choirmaster: newChoirmaster },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving choirmaster:", error);
    return NextResponse.json({ message: "Failed to save choirmaster" }, { status: 500 });
  }
}

// ✅ PATCH - Update choirmaster status
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const admin = await getAuthAdmin();
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ message: "Status is required" }, { status: 400 });
    }

    const allowed = ["Pending", "Accepted", "Rejected"];
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { message: `Invalid status. Allowed: ${allowed.join(", ")}` },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const result = await db.collection("choirmasters").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
          updatedBy: (admin as any).adminId ?? null,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Choirmaster not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating choirmaster:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ DELETE - Delete choirmaster
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const admin = await getAuthAdmin();
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const result = await db.collection("choirmasters").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Choirmaster not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Choirmaster deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting choirmaster:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
