import mongoose from "mongoose";

export class Database {
    static async connectDB() {
        const DB_URL = 'mongodb://127.0.0.1:27017/book_manager';
        return await mongoose.connect(DB_URL);
    }
}