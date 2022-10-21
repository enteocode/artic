import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UrlService } from '../url/url.service';
import { ArtworkInterface } from './artwork.interface';
import { ArtworkResponseInterface } from './artwork.response.interface';
import { UrlSearchInterface } from '../url/url.search.interface';

@Injectable()
export class ArtworkService {
  private readonly fields: string[] = ['id', 'title', 'artist_titles', 'thumbnail'];

  constructor(private readonly http: HttpService, private readonly url: UrlService) {}

  get(id: number) {
    return this.getResponse(`artworks/${id}`);
  }

  getAll(take?: number, page?: number): Promise<ArtworkInterface[]> {
    return this.getResponse<ArtworkInterface[]>('artworks', { limit: String(take), page: String(page) });
  }

  private async getResponse<T>(endpoint: string, search: UrlSearchInterface = null): Promise<T> {
    const url = new URL(`https://api.artic.edu/api/v1/${endpoint}`);

    // Narrowing down response fields

    this.url.setSearchParam(url, { fields: this.fields });

    // Custom queries

    if (search) {
      this.url.setSearchParam(url, search);
    }
    const response = await this.http.axiosRef.get<ArtworkResponseInterface<T>>(url.toString());

    if (response.status >= 400) {
      throw new HttpException(response.statusText, response.status);
    }
    const { data } = response;

    if (data) {
      return response.data.data;
    }
    return null;
  }
}
