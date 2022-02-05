import { getDb } from '../utils/database.js';
import {Property} from './property.js'


/*
export class FavoriteProperty extends Property {

    constructor(ownerAddress: string, links: string[], public readonly userAddress: string) {
        super(ownerAddress, links);
        this.userAddress = userAddress;
    }

    static async findFavorites(userAddress: string) {
        const db = getDb();
        try {
            const result = await db.collection('favorite-properties')
                .findMany(
                    { userAddress });
            return result
        } catch (err) {
            return;
        }
    }
}
*/