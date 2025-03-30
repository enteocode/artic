import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cache, CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import { ArtworkInterface } from './artwork.interface';
import { UrlSearchInterface } from '../url/url.search.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@CacheKey('artwork')
@Injectable()
export class ArtworkService {
    constructor(
        private readonly http: HttpService,
        private readonly url: UrlService
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
        private readonly http: HttpService
    ) {}

    private getRequestFields(): Array<keyof ArtworkInterface> {
        return ['id', 'title', 'artist_titles', 'thumbnail'];
    }

    private getResponse<T>(url: number | string, search: object = {}): Promise<T> {
        const params = { ...search, fields: this.getRequestFields() };
        const stream = this.http.get(`/${url}`, { params }).pipe(map((response) => response.data));

        return firstValueFrom(stream);
    }

    public async get(id: number): Promise<ArtworkInterface> {
        const cached = await this.cache.get<ArtworkInterface>(String(id));

        if (cached) {
            return cached;
        }
        const artwork = await this.getResponse<ArtworkInterface>(id);

        if (artwork) {
            await this.cache.set(String(id), artwork);
        }
        return artwork;
    }

    public async getAll(limit?: number, page?: number): Promise<ArtworkInterface[]> {
        const list = await this.getResponse<ArtworkInterface[]>('', { fields: this.getRequestFields(), limit, page });

        if (list.length) {
            await Promise.all(list.map((item) => this.cache.set(String(item.id), item)));
        }
        return list;
    }
}
