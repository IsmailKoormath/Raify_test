import mongoose from "mongoose";
import "dotenv/config";
const connection_string =
  process.env.MONGODB_URL || "mongodb://127.0.0.1/raifytest";

export const dbConnection = async () => {
  try {
    await mongoose.connect(connection_string);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw new Error("Failed to connect to MongoDB");
  }
};
