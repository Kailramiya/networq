import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
    try {
       const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully at:', conn.connection.host);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}
