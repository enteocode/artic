import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UrlService } from '../url/url.service';
import { ArtworkInterface } from './artwork.interface';
import { UrlSearchInterface } from '../url/url.search.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArtworkService {
    private readonly fields: string[] = ['id', 'title', 'artist_titles', 'thumbnail'];

    constructor(
        private readonly http: HttpService,
        private readonly url: UrlService
    ) {}

    public getEndpoint(id: string = ''): string {
        return ['https://api.artic.edu/api/v1/artworks', id].filter(Boolean).join('/');
    }

    public get(id: number): Observable<ArtworkInterface> {
        return this.getResponse(String(id));
    }

    public getAll(take?: number, page?: number): Observable<ArtworkInterface[]> {
        return this.getResponse<ArtworkInterface[]>('artworks', { limit: String(take), page: String(page) });
    }

    private getResponse<T>(id: string, search: UrlSearchInterface = {}): Observable<T> {
        const api = this.getEndpoint(id);
        const url = this.url.create(api, { ...search, fields: this.fields });

        return this.http.get(url.toString()).pipe(map((response) => response.data));
    }
}
