import { NextRequest, NextResponse } from 'next/server';
import { authUseCase } from '@/presentation/container';
import { RegisterDTO } from '@/application/dtos';
import { handleApiError } from '@/presentation/utils';

export async function POST(request: NextRequest) {
  console.log('Registration request received');
  try {
    const body = await request.json();
    console.log('Request body:', { ...body, password: '***' });
    const input = RegisterDTO.parse(body);
    const result = await authUseCase.register(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
