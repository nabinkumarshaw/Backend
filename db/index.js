import mongoose from 'mongoose';
import { DB_NAME } from '../src/constant.js';

const connectDb = async () => {
  try {
    const dbconnect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("✅ Database connected successfully");
    console.log(dbconnect);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDb;
