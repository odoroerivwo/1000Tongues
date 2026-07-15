import { Router } from "express";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer"; // <-- ADDED: Mailer import

const router = Router();

const uri = process.env.MONGODB_URI;
if (!uri) console.error("Warning: MONGODB_URI is not defined in .env");

// VERCEL FIX: Added fallback string to prevent crash on boot
const client = new MongoClient(uri || "");

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
    const lastName = req.body.lastName || "";

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

    if (userEmail) {
      try {
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
      } catch (mailErr: any) {
        console.error("❌ Failed to send confirmation email:", mailErr);
      }
    } else {
      console.log("⚠️ No email provided in submission, skipping confirmation email.");
    }

    // Send email to admin
    const adminEmail = process.env.RECEIVER_EMAIL || process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        const adminMailOptions = {
          from: `"1000 Tongues Website" <${process.env.EMAIL_USER}>`,
          to: adminEmail,
          subject: `🎉 New Chorister Registration: ${firstName} ${lastName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #0A192F; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Chorister Registration</h2>
                <p>A new registration has been submitted from the 1000 Tongues website:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; width: 180px; border-bottom: 1px solid #eee;">First Name:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${firstName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Last Name:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${lastName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${userEmail || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Phone Number:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${req.body.phoneNumber || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Church Name:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${req.body.churchName || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Choir Experience:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${req.body.previousChoristerExperience || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Voice Part:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${req.body.voiceRange || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Preferred Hub:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${req.body.preferredHub || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Musical Background:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${req.body.musicalExperience || "Not provided"}</td>
                    </tr>
                </table>
                <br/>
                <p style="font-size: 12px; color: #666;">This is an automated notification from the 1000 Tongues website backend.</p>
            </div>
          `,
        };

        await transporter.sendMail(adminMailOptions);
        console.log(`✅ Admin notification email successfully sent to: ${adminEmail}`);
      } catch (adminMailErr: any) {
        console.error("❌ Failed to send admin notification email:", adminMailErr);
      }
    } else {
      console.log("⚠️ No admin email defined, skipping admin notification email.");
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