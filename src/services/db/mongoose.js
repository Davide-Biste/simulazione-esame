import mongoose from "mongoose";
import "dotenv/config";

export default async function mongooseConnection() {
  try {
    console.log("Connecting to mongoose...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongoose connected.");
  } catch (e) {
    console.error({ ErrorConnectionDB: e });
  }
}
