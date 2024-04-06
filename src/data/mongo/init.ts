import mongoose from "mongoose";

interface ConnectionOptions{
    mongoUrl: string;
    dbName: string;
}


export class MongoDatabase{
    static async connect(options: ConnectionOptions){
        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect( mongoUrl, {
                dbName: dbName,
            });            

            console.log('Connected to Mongo Database');

        } catch (error) {
            console.error('Error connecting to Mongo Database')
            throw error;            
        }
    }
}