import { PostgresUserRepository, PostgresReportRepository } from '@/infrastructure/repositories';
import { BcryptHashService, JwtTokenService, PagasaMockService } from '@/infrastructure/services';
import { AuthUseCase } from '@/application/auth.use-case';
import { ReportUseCase } from '@/application/report.use-case';
import { AnalyticsUseCase } from '@/application/analytics.use-case';

const userRepository = new PostgresUserRepository();
const reportRepository = new PostgresReportRepository();
const hashService = new BcryptHashService();
const tokenService = new JwtTokenService();
const pagasaService = new PagasaMockService();

export const authUseCase = new AuthUseCase(userRepository, hashService, tokenService);
export const reportUseCase = new ReportUseCase(reportRepository);
export const analyticsUseCase = new AnalyticsUseCase(reportRepository, pagasaService);
export { tokenService };
