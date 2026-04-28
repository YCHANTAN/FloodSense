import { NextRequest, NextResponse } from 'next/server';
import { reportUseCase, tokenService } from '@/presentation/container';
import { CreateReportDTO } from '@/application/dtos';
import { handleApiError } from '@/presentation/utils';
import { UnauthorizedError } from '@/core/errors';

export async function GET() {
  try {
    const reports = await reportUseCase.getReports();
    return NextResponse.json(reports);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError();
    }
    const token = authHeader.split(' ')[1];
    const decoded = tokenService.verify(token);
    if (!decoded) throw new UnauthorizedError();

    const contentType = request.headers.get('content-type') || '';
    
    let input;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      input = CreateReportDTO.parse({
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string),
        // Image handling would go here, for now we just pass a placeholder URL
        imageUrl: 'https://via.placeholder.com/400x300?text=Flood+Report',
      });
    } else {
      const body = await request.json();
      input = CreateReportDTO.parse(body);
    }

    const result = await reportUseCase.createReport(decoded.id, input);
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
