import { Injectable } from '@nestjs/common';
import { v4, v5 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env/environment.variables';

@Injectable()
export class UuidService {
    constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

    /**
     * Generates a Universally Unique Identifier (UUID) based on random
     * or seed.
     *
     * @param seed
     * @param namespace
     */
    public create(seed = '', namespace = this.config.get('UUID_NAMESPACE')): string {
        if (seed) {
            return v5(seed, namespace);
        }
        return v4();
    }
}
