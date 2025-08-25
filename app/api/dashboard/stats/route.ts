import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const tokenPayload = await getTokenFromRequest(request);
    
    if (!tokenPayload) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For demo purposes, return mock data
    // In production, this would query actual data based on user's store(s)
    const stats = {
      totalOrders: 156,
      totalRevenue: 12456.50,
      activeOrders: 8,
      totalCustomers: 89,
      orderGrowth: 15.3,
      revenueGrowth: 22.1
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}