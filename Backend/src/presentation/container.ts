import { PostgresUserRepository, PostgresReportRepository } from '@/infrastructure/repositories';
import { BcryptHashService, JwtTokenService } from '@/infrastructure/services';
import { AuthUseCase } from '@/application/auth.use-case';
import { ReportUseCase } from '@/application/report.use-case';

const userRepository = new PostgresUserRepository();
const reportRepository = new PostgresReportRepository();
const hashService = new BcryptHashService();
const tokenService = new JwtTokenService();

export const authUseCase = new AuthUseCase(userRepository, hashService, tokenService);
export const reportUseCase = new ReportUseCase(reportRepository);
export { tokenService };
