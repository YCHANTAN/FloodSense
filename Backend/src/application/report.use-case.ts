import { IReportRepository } from './interfaces';
import { CreateReportInput } from './dtos';

export class ReportUseCase {
  constructor(private reportRepository: IReportRepository) {}

  async getReports() {
    return await this.reportRepository.findAll();
  }

  async createReport(userId: string, input: CreateReportInput) {
    // In a real app, we might call an AI service to estimate depth from image
    // For now, we use the provided depth or a default
    const waterDepthCm = input.waterDepthCm ?? Math.floor(Math.random() * 100);

    const report = await this.reportRepository.create({
      userId,
      latitude: input.latitude,
      longitude: input.longitude,
      waterDepthCm,
      imageUrl: input.imageUrl,
    });

    return {
      id: report.id,
      estimatedDepthCm: report.waterDepthCm,
      status: 'success' as const,
    };
  }
}
