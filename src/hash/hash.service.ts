import { Inject, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { XXHashAPI } from 'xxhash-wasm';
import { HashType } from './hash.type';
import { HASH_INSTANCE } from './hash.constants';

@Injectable()
export class HashService {
    constructor(@Inject(HASH_INSTANCE) private readonly hash: XXHashAPI) {}

    public create(input: string, type: HashType = HashType.NON_CRYPTOGRAPHIC_32): Buffer {
        const algo = this.getAlgorithm(type);
        const hash = algo.update(input).digest();

        return Buffer.from(hash.toString());
    }

    private getAlgorithm(type: HashType) {
        if (type === HashType.NON_CRYPTOGRAPHIC_32) {
            return this.hash.create32();
        }
        if (type === HashType.NON_CRYPTOGRAPHIC_64) {
            return this.hash.create64();
        }
        throw new UnsupportedMediaTypeException('Invalid hash type');
    }
}
