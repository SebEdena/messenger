import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements OnModuleInit {
  private hashParams: { saltRounds: number };

  constructor(private config: ConfigService) {}

  onModuleInit() {
    this.hashParams = this.config.get('hash');
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.hashParams.saltRounds);
  }

  async comparePasswords(password: string, dbHash: string) {
    return await bcrypt.compare(password, dbHash);
  }
}
