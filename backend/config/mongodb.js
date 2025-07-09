import mongoose from "mongoose";

const mongooseDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database Connected")
    );
    await mongoose.connect(`${process.env.MONGO_URI}/bgRemoval`);
  } catch (error) {
    console.log(error.message);
  }
};

export default mongooseDB;
