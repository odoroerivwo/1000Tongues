import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);


dotenv.config();

// Use MONGODB_URI from .env file
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';

async function createAdmin() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    console.error('💡 Make sure you have a .env file with MONGODB_URI variable');
    process.exit(1);
  }

  console.log('🔗 Connecting to MongoDB...');
  
  // Add connection options for better error handling
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const admins = db.collection('admins');
    
    // Check if admin already exists
    const existingAdmin = await admins.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with email:', ADMIN_EMAIL);
      console.log('💡 If you want to reset the password, delete the existing admin first');
      await client.close();
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(ADMIN_EMAIL)) {
      throw new Error('Invalid email format');
    }
    
    // Validate password strength
    if (ADMIN_PASSWORD.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    
    // Create admin
    console.log('📝 Creating admin user...');
    const result = await admins.insertOne({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log('\n✅ Admin created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', ADMIN_EMAIL);
    console.log('🔑 Password:', ADMIN_PASSWORD);
    console.log('🆔 ID:', result.insertedId.toString());
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Save these credentials securely!');
    console.log('💡 You can now use these credentials to log in\n');
    
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Cannot connect to MongoDB. Make sure:');
      console.error('   - MongoDB is running');
      console.error('   - MONGODB_URI in .env is correct');
    } else if (error.message.includes('authentication failed')) {
      console.error('💡 Authentication failed. Check your MongoDB credentials');
    } else if (error.message.includes('Invalid email')) {
      console.error('💡 Please provide a valid email address');
    } else if (error.message.includes('Password must be')) {
      console.error('💡 Please provide a stronger password');
    }
    
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB\n');
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error.message);
  process.exit(1);
});

// Run the script
createAdmin().catch((error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});