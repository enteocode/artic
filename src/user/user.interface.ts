import { Uuid } from '../uuid/uuid.type';

export interface UserInterface {
    id: Uuid;
    username: string;
    password: string;
}
