import { UserInterface } from '../user/user.interface';

export interface FavoriteInterface {
    id: string;
    user: UserInterface;
    artwork: number;
}
