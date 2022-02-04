import {MongoClient} from 'mongodb';

let _db: any;

export const mongoConnect = async ()  => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI_DEV!);
        console.log(`Connected to mongoDB`);
        _db = client.db();    
    } catch (err) {
        console.log(err);
        throw Error('Servicio no disponible. Por favor vuelve a intentar más tarde');        
    }
};

export const getDb = () => {
    if(_db) {
        return _db;
    }
    throw Error('No database found');
};
