import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, QueryFailedError } from 'typeorm';
import { Uuid } from '../uuid/uuid.type';
import { UuidService } from '../uuid/uuid.service';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
    private readonly logger = new Logger(FavoriteService.name);

    constructor(
        private readonly manager: EntityManager,
        private readonly uuid: UuidService
    ) {}

    private createId(user: Uuid, artwork: number): string {
        return this.uuid.create(`${user}:${artwork}`);
    }

    public async add(user: Uuid, artwork: number): Promise<number> {
        try {
            await this.manager.insert(Favorite, {
                id: this.createId(user, artwork),
                user: { id: user },
                artwork
            });
        } catch (e) {
            if (false === e instanceof QueryFailedError) {
                throw e;
            }
            this.logger.warn(
                `User#${user} tried to add Artwork#${artwork} to the favorites, which is already persisted`
            );
        }
        return artwork;
    }

    public async get(user: Uuid): Promise<number[]> {
        const list = await this.manager.find(Favorite, {
            select: ['artwork'],
            where: {
                user: { id: user }
            }
        });

        return list.map(({ artwork }) => artwork);
    }

    public async remove(user: Uuid, artwork: number): Promise<boolean> {
        try {
            await this.manager.remove(Favorite, { id: this.createId(user, artwork) } as Favorite);
        } catch (e) {
            console.log('ERROR', e);
            return false;
        }
        return true;
    }
}
