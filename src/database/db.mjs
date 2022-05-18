import mongoose from "mongoose";

export default {
  connect: async () => {
    try {
      // await mongoose.connect(process.env.DB);
      await mongoose.connect(
        "mongodb+srv://tonduong2128:tonduong2128@cluster0.u5ntb.mongodb.net/web-express"
      );
      console.log("connect database successfully");
    } catch (error) {
      console.log("Connect to failed");
    }
  },
};
