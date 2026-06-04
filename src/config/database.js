import mongoose from "mongoose";
import config from "./env.js";
const connectDB = async () => {
  await mongoose.connect(config.MONGO_DB_URL, {
    dbName: "crevia-db"
  });
};
export default connectDB;
