import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ GET — Fetch single chorister
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const chorister = await db
      .collection("choristers")
      .findOne({ _id: new ObjectId(id) });

    if (!chorister) {
      return NextResponse.json({ message: "Chorister not found" }, { status: 404 });
    }

    return NextResponse.json({ chorister }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chorister:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ PATCH — Update chorister info or status
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const updates = await request.json();

    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const result = await db
      .collection("choristers")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Chorister not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Chorister updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating chorister:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ DELETE — Remove chorister
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("1000t-admin");

    const result = await db
      .collection("choristers")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Chorister not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Chorister deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting chorister:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
