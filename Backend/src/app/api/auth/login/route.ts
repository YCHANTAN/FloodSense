import { NextRequest, NextResponse } from 'next/server';
import { authUseCase } from '@/presentation/container';
import { LoginDTO } from '@/application/dtos';
import { handleApiError } from '@/presentation/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = LoginDTO.parse(body);
    const result = await authUseCase.login(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
