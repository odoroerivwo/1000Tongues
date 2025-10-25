require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Use MONGODB_URI from .env file
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';

async function createAdmin() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    process.exit(1);
  }

  console.log('🔗 Connecting to MongoDB...');
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const admins = db.collection('admins');
    
    // Check if admin already exists
    const existingAdmin = await admins.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with email:', ADMIN_EMAIL);
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    
    // Create admin
    const result = await admins.insertOne({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      createdAt: new Date(),
    });
    
    console.log('\n✅ Admin created successfully!');
    console.log('📧 Email:', ADMIN_EMAIL);
    console.log('🔑 Password:', ADMIN_PASSWORD);
    console.log('🆔 ID:', result.insertedId);
    console.log('\n⚠️  Save these credentials securely!');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

createAdmin();