import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "ecom",
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("mongodb connect problem", error);
  }
};
