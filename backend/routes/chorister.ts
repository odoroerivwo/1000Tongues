import { Router } from "express";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer"; // <-- ADDED: Mailer import

const router = Router();

const uri = process.env.MONGODB_URI;
if (!uri) console.error("Warning: MONGODB_URI is not defined in .env");

// VERCEL FIX: Added fallback string to prevent crash on boot
const client = new MongoClient(uri || "mongodb://localhost:27017");

console.log("✅ Chorister Routes Loaded");

router.post("/chorister", async (req, res) => {
  try {
    await client.connect();
    
    const db = client.db("1000t-admin");
    const collection = db.collection("choristers");

    console.log("📥 Received Chorister Submission:", req.body);

    // 1. Save data to MongoDB
    const result = await collection.insertOne({
      ...req.body,
      submittedAt: new Date()
    });

    // 2. --- MAILING FEATURE START ---
    const userEmail = req.body.email;
    const firstName = req.body.firstName || "Choir Member";

    if (userEmail) {
      // Connect to your email server using your existing .env variables
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false, 
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
              <p>Hi ${firstName},</p>
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
    } else {
      console.log("⚠️ No email provided in submission, skipping confirmation email.");
    }
    // --- MAILING FEATURE END ---

    // 3. Send success response back to the frontend
    res.status(200).json({ 
      success: true, 
      message: "Chorister registration saved and confirmation email sent successfully",
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
});

export default router;