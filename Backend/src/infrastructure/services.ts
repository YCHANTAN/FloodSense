import { IHashService, ITokenService } from '@/application/services';
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
