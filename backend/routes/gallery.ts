import { Router } from "express";
import { google } from "googleapis";
import path from "path";

const router = Router();

// Set up Google Drive Authentication
const KEYFILEPATH = path.join(__dirname, "../drive-credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

router.get("/gallery", async (req, res) => {
  try {
    const drive = google.drive({ version: "v3", auth });
    
    const FOLDER_ID = "1X2bxv-CA9thWNd7YxG-PQnavPhGAFdlA"; 

    // Fetch files from the specific folder
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
      // --- CHANGE 1: We specifically ask Google for the 'thumbnailLink' ---
      fields: "files(id, name, thumbnailLink)",
      orderBy: "createdTime desc", 
    });

// Map the files to direct viewing URLs
    const images = response.data.files?.map(file => {
      
      // 1. Try to get the high-res thumbnail link if Google provided it
      let finalUrl = file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, "=s1080") : "";

      // 2. BULLETPROOF FALLBACK: If Google hid the thumbnailLink, force it using the direct thumbnail endpoint
      if (!finalUrl) {
        finalUrl = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1080`;
      }

      // Console log so we can see exactly what link is being generated in the terminal!
      
      // console.log(`🔗 Generated URL for ${file.name}:`, finalUrl);

      return {
        id: file.id,
        name: file.name,
        url: finalUrl 
      };
      
    }) || [];

    res.status(200).json(images);

  } catch (error) {
    console.error("❌ Gallery Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch images from Google Drive" });
  }
});

export default router;