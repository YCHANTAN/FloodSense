import { NextResponse } from 'next/server';
import { DomainError } from '@/core/errors';
import { ZodError } from 'zod';

export function handleApiError(error: unknown) {
  console.error(error);

  if (error instanceof ZodError) {
    return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
  }

  if (error instanceof DomainError) {
    let status = 400;
    if (error.name === 'UnauthorizedError') status = 401;
    if (error.name === 'InvalidCredentialsError') status = 401;
    return NextResponse.json({ message: error.message }, { status });
  }

  return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
}
