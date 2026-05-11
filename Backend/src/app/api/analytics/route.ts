import { NextResponse } from 'next/server';
import { analyticsUseCase } from '@/presentation/container';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Cebu City';
    
    const data = await analyticsUseCase.getDashboardData(city);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
