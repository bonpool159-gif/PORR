import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password, role, storeName, storeAddress } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Name, email, password, and role are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(phone ? [{ phone }] : [])
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or phone already exists' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user and store in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          phone: phone || null,
          role,
          passwordHash,
        },
      });

      // If user is an owner, create a store
      if (role === 'OWNER' && storeName && storeAddress) {
        const storeSlug = generateSlug(storeName);
        
        await tx.store.create({
          data: {
            name: storeName,
            slug: storeSlug,
            address: storeAddress,
            ownerId: user.id,
          },
        });
      }

      return user;
    });

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        userId: result.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}