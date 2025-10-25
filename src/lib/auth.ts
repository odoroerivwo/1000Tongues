import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Get JWT_SECRET from environment - no fallback
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in .env file');
}

const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  adminId: string;
  email: string;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  console.log('Signing token with jose');
  const token = await new SignJWT({ 
    adminId: payload.adminId,
    email: payload.email 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
  
  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    console.log('Verifying token with jose');
    const { payload } = await jwtVerify(token, secret);
    console.log('Token verified successfully for:', payload.email);
    
    // Validate that the payload has the required fields
    if (
      typeof payload.adminId === 'string' && 
      typeof payload.email === 'string'
    ) {
      return {
        adminId: payload.adminId,
        email: payload.email,
      };
    }
    
    console.error('Token payload missing required fields');
    return null;
  } catch (error) {
    console.error('Token verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export async function getAuthAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  
  if (!token) return null;
  
  return verifyToken(token.value);
}