import { Router, Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const router = Router();

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not defined in .env");

const client = new MongoClient(uri);
const db = client.db("1000t-admin");

console.log("✅ Partnership Routes Loaded");

router.post('/partnerships', async (req: Request, res: Response) => {
  try {
    await client.connect();
    const collection = db.collection("partnerships");
    
    // Add timestamp to the data
    const newPartnership = {
      ...req.body,
      submittedAt: new Date()
    };

    const result = await collection.insertOne(newPartnership);
    
    console.log('✅ New partnership saved:', result.insertedId);
    res.status(201).json({ 
      message: 'Partnership saved successfully!', 
      data: { ...newPartnership, _id: result.insertedId }
    });
  } catch (error) {
    console.error('❌ Error saving partnership:', error);
    res.status(500).json({ 
      message: 'Server error while saving partnership', 
      error 
    });
  } finally {
    await client.close();
  }
});

export default router;