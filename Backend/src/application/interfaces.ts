import { User, Report } from '../core/entities';

export interface IPagasaService {
  getLatestBulletins(city: string): Promise<any>;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
}

export interface IReportRepository {
  findAll(): Promise<Report[]>;
  create(report: Omit<Report, 'id' | 'timestamp'>): Promise<Report>;
}
