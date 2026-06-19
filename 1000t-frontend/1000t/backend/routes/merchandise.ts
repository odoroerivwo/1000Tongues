import { Router } from "express";
import { MongoClient } from "mongodb";

const router = Router();

const uri = process.env.MONGODB_URI;
if (!uri) console.error("Warning: MONGODB_URI is not defined in .env");

const client = new MongoClient(uri || "");

console.log("✅ Merchandise Routes Loaded");

router.post("/merchandise", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("1000t-admin");
    const collection = db.collection("merchandise_orders");
    
    const orderData = req.body;
    
    // Add default status and timestamp
    const result = await collection.insertOne({
      ...orderData,
      status: "Pending",
      submittedAt: new Date()
    });

    console.log("✅ Saved Merchandise Order:", result.insertedId);
    res.status(200).json({ success: true, message: "Order placed successfully", id: result.insertedId });
  } catch (err: any) {
    console.error("❌ Merchandise Order Save Error:", err);
    res.status(500).json({ success: false, message: "Error saving order", error: err.message });
  }
});

router.get("/merchandise", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("1000t-admin");
    const collection = db.collection("merchandise_orders");

    const data = await collection.find({}).sort({ submittedAt: -1 }).toArray();

    res.status(200).json(data);
  } catch (err: any) {
    console.error("❌ Merchandise Order Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch merchandise orders", error: err.message });
  }
});

export default router;
