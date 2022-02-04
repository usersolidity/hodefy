import { getDb } from '../utils/database.js';


export class Property {

    constructor(public readonly ownerAddress: string, public links: string[]) {
        this.ownerAddress = ownerAddress;
        this.links = links;
    }

    async save(this: Property) {
        const db = getDb();
        try {
            const result = await db.collection('properties').insertOne(this);
            return result;
        } catch (err) {
            return;
        }
    }

    static async findById(userAddress: string) {
        const db = getDb();
        try {
            const result = await db.collection('users')
                .findOne(
                    { _id: userAddress });
            return result
        } catch (err) {
            return;
        }
    }
}