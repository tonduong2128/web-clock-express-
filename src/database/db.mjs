import mongoose from 'mongoose';

export default {
    connect: async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/web-express');
            console.log("connect database successfully");
        } catch (error) {
            console.log("Connect to failed");
        }
    }
}