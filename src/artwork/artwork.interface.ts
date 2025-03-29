import { ArtworkThumbnailInterface } from './artwork.thumbnail.interface';

export interface ArtworkInterface {
    id: number;
    title: string;
    artist_titles: string[];
    thumbnail: ArtworkThumbnailInterface;
}
