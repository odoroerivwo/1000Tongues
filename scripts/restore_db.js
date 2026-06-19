const { MongoClient, BSON } = require('mongodb');
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '..', '..', '..', 'db_backup');
const TARGET_URI = process.argv[2];

if (!TARGET_URI) {
  console.error("❌ Error: Target MongoDB URI is required as an argument.");
  console.log("Usage: node restore_db.js \"mongodb+srv://user:pass@cluster/...\"");
  process.exit(1);
}

async function run() {
  // Connect to database '1000t-admin' on target connection
  const client = new MongoClient(TARGET_URI);
  try {
    console.log("Connecting to target database...");
    await client.connect();
    
    // Explicitly target database name "1000t-admin" matching original setup
    const db = client.db("1000t-admin");
    console.log(`Connected successfully to target database: ${db.databaseName}`);
    
    // Read files in backup directory
    if (!fs.existsSync(BACKUP_DIR)) {
      console.error(`❌ Backup directory not found at: ${BACKUP_DIR}`);
      process.exit(1);
    }
    
    const files = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('.json'));
    console.log(`Found ${files.length} backup files to restore.`);
    
    for (const file of files) {
      const colName = file.replace('.json', '');
      const filePath = path.join(BACKUP_DIR, file);
      
      console.log(`Restoring collection: ${colName}...`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Deserialize documents from Extended JSON (recovers ObjectIds, Dates, etc.)
      const documents = BSON.EJSON.parse(fileContent);
      
      if (documents.length === 0) {
        console.log(`⚠️ Collection '${colName}' is empty, skipping import.`);
        continue;
      }
      
      const collection = db.collection(colName);
      
      // Optional: Drop target collection if it exists to ensure fresh copy
      try {
        await collection.drop();
        console.log(`Dropped existing target collection: ${colName}`);
      } catch (err) {
        // Ignore if collection doesn't exist
      }
      
      const result = await collection.insertMany(documents);
      console.log(`✅ Restored ${result.insertedCount} documents to collection '${colName}'`);
    }
    
    console.log("\n🎉 Database restoration completed successfully!");
  } catch (err) {
    console.error("❌ Restoration failed:", err);
  } finally {
    await client.close();
  }
}

run();
