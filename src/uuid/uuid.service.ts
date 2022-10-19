import { Injectable } from '@nestjs/common';
import { v4, v5 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';

@Injectable()
export class UuidService {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  create(seed: string = '', namespace: string = ''): string {
    if (seed) {
      return v5(seed, namespace || this.config.get('UUID_NAMESPACE'))
    }
    return v4();
  }
}
