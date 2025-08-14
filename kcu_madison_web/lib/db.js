{/* Contains connectMongo function */}

import mongoose from "mongoose";

const connectMongo = async () => {
    console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);
    if (mongoose.connection.readyState >= 1) {
        console.log('Already connected, readyState:', mongoose.connection.readyState);
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw error; // Propagate error to be caught in server.js
    }
};

export default connectMongo;
