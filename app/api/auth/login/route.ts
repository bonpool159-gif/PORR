import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        ownedStores: true,
        storeStaff: {
          include: {
            store: true
          }
        }
      }
    });

    if (!user || !await verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Account is deactivated' },
        { status: 401 }
      );
    }

    // Determine the store for the user
    let storeId: string | undefined;
    if (user.ownedStores.length > 0) {
      storeId = user.ownedStores[0].id;
    } else if (user.storeStaff.length > 0) {
      storeId = user.storeStaff[0].storeId;
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      storeId
    };

    const token = await signToken(tokenPayload);
    setAuthCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeId
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}