import mongoose from "mongoose";

export default {
  connect: async () => {
    try {
      await mongoose.connect(process.env.DB);
      console.log("connect database successfully");
    } catch (error) {
      console.log("Connect to failed");
    }
  },
};
