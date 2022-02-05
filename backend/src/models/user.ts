import { getDb } from '../utils/database.js';
import {ObjectId} from 'mongodb';


export class User {

    constructor(public readonly ownerAddress: string, public email: string, public address: string) {
        this.ownerAddress = ownerAddress;
        this.email = email;
        this.address = address;
    }

    async save(this: User) {
        const db = getDb();
        try {
            const result = await db.collection('users').insertOne(this);
            return result;
        } catch (err) {
            return;
        }
    }

    static async findById(userId: ObjectId) {
        const db = getDb();
        try {
            const result = await db.collection('users')
                .findOne(
                    { _id: userId });
            return result
        } catch (err) {
            return;
        }
    }

    static async findByOwnerAddress(ownerAddress: string) {
        const db = getDb();
        try {
            const result = await db.collection('users')
                .findOne(
                    { ownerAddress });
            return result
        } catch (err) {
            return;
        }
    }
}