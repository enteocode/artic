import { Injectable } from '@nestjs/common';
import { UrlSearchInterface } from './url.search.interface';

@Injectable()
export class UrlService {
    public create(endpoint: string, params: UrlSearchInterface): URL {
        const url = new URL(endpoint);

        if (params) {
            url.search = this.getSearchParams(params).toString();
        }
        return url;
    }

    public getSearchParams(params: UrlSearchInterface): URLSearchParams {
        const search = new URLSearchParams();

        if (!params) {
            return search;
        }
        for (const [name, value] of Object.entries(params)) {
            if (!name) {
                continue;
            }
            if (Array.isArray(value)) {
                value.forEach(search.append.bind(search, `${name}[]`));
            } else {
                search.set(name, value);
            }
        }
        return search;
    }
}
