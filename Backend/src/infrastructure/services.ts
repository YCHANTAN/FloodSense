import { IHashService, ITokenService } from '@/application/services';
import { IPagasaService } from '@/application/interfaces';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class BcryptHashService implements IHashService {
  async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
  async compare(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}

export class JwtTokenService implements ITokenService {
  private secret = process.env.JWT_SECRET || 'secret';

  generate(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1d' });
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}

export class PagasaMockService implements IPagasaService {
  async getLatestBulletins(city: string): Promise<any> {
    if (city.toLowerCase().includes('cebu')) {
      return {
        location: 'Cebu City',
        timestamp: new Date().toISOString(),
        weather: {
          condition: 'Heavy Rain',
          temperature: 26,
          rainfall_24h: '45mm',
        },
        flood_warnings: [
          {
            level: 'Orange',
            area: 'Metro Cebu',
            message: 'Flooding is threatening in low-lying areas and near river channels.',
            issued_at: new Date().toISOString(),
          }
        ],
        tide_info: {
          high_tide: '02:45 PM',
          low_tide: '08:12 AM',
        }
      };
    }
    return {
      location: city,
      timestamp: new Date().toISOString(),
      weather: { condition: 'Partly Cloudy', temperature: 29 },
      flood_warnings: [],
    };
  }
}
