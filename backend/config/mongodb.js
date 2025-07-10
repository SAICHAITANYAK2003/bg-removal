import mongoose from "mongoose";

const mongooseDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB:", mongoose.connection.name);
  } catch (error) {
    console.log("❌ Mongo Error:", error.message);
  }
};

export default mongooseDB;
