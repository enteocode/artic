import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class SecurityPasswordService {
  encrypt(password: string, rounds = 13): Promise<string> {
    return hash(password, rounds);
  }

  compare(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }
}
