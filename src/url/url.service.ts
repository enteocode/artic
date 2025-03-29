import { Injectable } from '@nestjs/common';
import { UrlSearchInterface } from './url.search.interface';

@Injectable()
export class UrlService {
    setSearchParam(url: URL, params: UrlSearchInterface) {
        const { searchParams } = url;

        for (const [name, value] of Object.entries(params)) {
            if (Array.isArray(value)) {
                value.forEach(searchParams.append.bind(searchParams, `${name}[]`));
            } else {
                searchParams.set(name, value);
            }
        }
        return url;
    }
}
