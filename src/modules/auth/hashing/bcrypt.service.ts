import { HashingService } from './hashing.service';
import * as bcrypt from 'bcrypt';

export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(data, salt);
  }

  async compare(data: string | Buffer, hashedValue: string): Promise<Boolean> {
    return bcrypt.compare(data, hashedValue);
  }
}
