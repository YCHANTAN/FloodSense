import { IUserRepository, IReportRepository } from '@/application/interfaces';
import { User, Report } from '@/core/entities';
import { db } from './db/db';
import { users, reports } from './db/schema';
import { eq } from 'drizzle-orm';

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  }

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const [result] = await db.insert(users).values(user).returning();
    return result;
  }
}

export class PostgresReportRepository implements IReportRepository {
  async findAll(): Promise<Report[]> {
    return await db.select().from(reports);
  }

  async create(report: Omit<Report, 'id' | 'timestamp'>): Promise<Report> {
    const [result] = await db.insert(reports).values(report).returning();
    return result;
  }
}
