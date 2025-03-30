import { Uuid } from '../uuid/uuid.type';

export type TokenPayload = {
    /**
     * The ID of the Token
     */
    uuid?: Uuid;

    /**
     * The ID of the authenticated User
     */
    user: Uuid;
};
