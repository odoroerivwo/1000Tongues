import { Router } from "express";
import { MongoClient } from "mongodb";

const router = Router();

const uri = process.env.MONGODB_URI;
if (!uri) console.error("Warning: MONGODB_URI is not defined in .env");

// Create client outside request handler to allow connection pooling
const client = new MongoClient(uri || "");

console.log("✅ Chorister Routes Loaded");

router.post("/chorister", async (req, res) => {
  try {
    // Connect to the client (if not already connected)
    await client.connect();
    
    // Connect to the specific database
    // Ensure this DB name matches what you want in your cluster
    const db = client.db("1000t-admin");
    const collection = db.collection("choristers");

    console.log("📥 Received Chorister Submission:", req.body);

    // DIRECT INSERTION: No validation checks.
    // We insert exactly what the frontend sends.
    const result = await collection.insertOne({
      ...req.body,
      submittedAt: new Date() // Useful to track when it came in
    });

    res.status(200).json({ 
      success: true, 
      message: "Chorister registration saved successfully",
      id: result.insertedId
    });

  } catch (err: any) {
    console.error("❌ Backend Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while saving registration",
      error: err.message 
    });
  }
  // IMPORTANT: We removed client.close() from here.
  // Keeping the connection open is standard for Node.js servers to handle multiple requests efficiently.
});

export default router;