// import { MongoDBNamespace } from 'mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function connectToDatabase(dbname) {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.useDb(dbname);
    }

    const uriWithDb = `${MONGODB_URI}/${dbname}`;

    await mongoose.connect(uriWithDb);

    return mongoose.connection.useDb(dbname);
}

export default connectToDatabase;
