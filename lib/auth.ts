import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key'
);

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  storeId?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload as TokenPayload;
}

export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token.value);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        ownedStores: true,
        storeStaff: {
          include: {
            store: true
          }
        }
      }
    });

    return { ...payload, user };
  } catch (error) {
    return null;
  }
}

export async function getTokenFromRequest(request: NextRequest): Promise<TokenPayload | null> {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }

  try {
    return await verifyToken(token);
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function removeAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete('auth-token');
}