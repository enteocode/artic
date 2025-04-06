import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { HASH_INSTANCE } from './hash.constants';

import xxhash from 'xxhash-wasm';

@Module({
    exports: [HashService],
    providers: [
        {
            provide: HASH_INSTANCE,
            useFactory: () => {
                // Extremely fast non-cryptographic algorithm with high velocity on small
                // data, loaded asynchronously due to WebAssembly initialization

                return xxhash();
            }
        },
        HashService
    ]
})
export class HashModule {}
