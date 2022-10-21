import { Injectable, Logger } from '@nestjs/common';
import { UserInterface } from '../user/user.interface';
import { EntityManager, QueryFailedError } from 'typeorm';
import { UuidService } from '../uuid/uuid.service';
import { Favorite } from './favorite.entity';
import { FavoriteInterface } from './favorite.interface';

@Injectable()
export class FavoriteService {
  private readonly logger = new Logger(FavoriteService.name);

  constructor(private readonly manager: EntityManager, private readonly uuid: UuidService) {}

  create(user: UserInterface, artwork: number): FavoriteInterface {
    return {
      id: this.uuid.create(`${user.id}:${artwork}`),
      user,
      artwork
    };
  }

  async add(user: UserInterface, artwork: number): Promise<FavoriteInterface> {
    const favorite = this.create(user, artwork);

    try {
      await this.manager.insert(Favorite, favorite);
    } catch (e) {
      if (false === e instanceof QueryFailedError) {
        throw e;
      }
      this.logger.warn(`User#${user.id} tried to add Artwork#${artwork} to the favorites, which is already persisted`);
    }
    return favorite;
  }

  async get(user: UserInterface): Promise<number[]> {
    const list = await this.manager.find(Favorite, { select: ['artwork'], where: { user } });

    return list.map(({ artwork }) => artwork)
  }

  async remove(user: UserInterface, artwork: number): Promise<boolean> {
    const entity = this.create(user, artwork);
    const result = await this.manager.delete(Favorite, entity.id);

    return Boolean(result.affected);
  }
}
