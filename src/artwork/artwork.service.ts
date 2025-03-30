import { Inject, Injectable } from '@nestjs/common';
import { Keyv } from '@keyv/redis';
import { HttpService } from '@nestjs/axios';
import { ArtworkInterface } from './artwork.interface';
import { KeyvEntry } from 'keyv';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { CACHE_INSTANCE } from '../cache/cache.constants';

@Injectable()
export class ArtworkService {
    constructor(
        @Inject(CACHE_INSTANCE) private cache: Keyv,
        private readonly http: HttpService
    ) {}

    private getRequestFields(): Array<keyof ArtworkInterface> {
        return ['id', 'title', 'artist_titles'];
    }

    private getCacheKey(id: number | string): string {
        return `artworks:${id}`;
    }

    private getResponse<T>(url: number | string, search: object = {}): Promise<T> {
        const params = { ...search, fields: this.getRequestFields() };
        const stream = this.http.get(`/${url}`, { params }).pipe(map((response) => response.data.data));

        return firstValueFrom(stream);
    }

    public async get(id: number): Promise<ArtworkInterface> {
        const stored = this.getCacheKey(id);
        const cached = await this.cache.get<ArtworkInterface>(stored);

        if (cached) {
            return cached;
        }
        const artwork = await this.getResponse<ArtworkInterface>(id);

        if (artwork) {
            await this.cache.set(stored, artwork);
        }
        return artwork;
    }

    public async getAll(take?: number, page?: number): Promise<ArtworkInterface[]> {
        const list = await this.getResponse<ArtworkInterface[]>('', {
            fields: this.getRequestFields(),
            page,
            limit: take
        });

        if (!list.length) {
            return list;
        }
        const entries: KeyvEntry[] = list.map<KeyvEntry>((item) => ({
            key: this.getCacheKey(item.id),
            value: item
        }));

        await this.cache.setMany(entries);

        return list;
    }
}
