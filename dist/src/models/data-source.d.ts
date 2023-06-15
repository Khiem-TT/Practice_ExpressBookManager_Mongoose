import mongoose from "mongoose";
export declare class Database {
    static connectDB(): Promise<typeof mongoose>;
}
