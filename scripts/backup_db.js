const { MongoClient, BSON } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env");
  process.exit(1);
}

const BACKUP_DIR = path.join(__dirname, '..', '..', '..', 'db_backup');

async function run() {
  const client = new MongoClient(MONGODB_URI);
  try {
    console.log("Connecting to source database...");
    await client.connect();
    
    // Connect to database (1000t-admin)
    const db = client.db();
    console.log(`Connected successfully to database: ${db.databaseName}`);
    
    // Ensure backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections.`);
    
    for (const colInfo of collections) {
      const colName = colInfo.name;
      // Skip system collections if any
      if (colName.startsWith('system.')) continue;
      
      console.log(`Backing up collection: ${colName}...`);
      const collection = db.collection(colName);
      const documents = await collection.find({}).toArray();
      
      const filePath = path.join(BACKUP_DIR, `${colName}.json`);
      
      // Serialize to MongoDB Extended JSON (keeps ObjectIds, Dates, etc.)
      const serialized = BSON.EJSON.stringify(documents, { relaxed: false });
      
      fs.writeFileSync(filePath, serialized, 'utf8');
      console.log(`✅ Collection '${colName}' backed up to ${filePath} (${documents.length} docs)`);
    }
    
    console.log("\n🎉 Database backup completed successfully!");
    console.log(`Backup files are stored in: ${path.resolve(BACKUP_DIR)}`);
  } catch (err) {
    console.error("❌ Backup failed:", err);
  } finally {
    await client.close();
  }
}

run();
