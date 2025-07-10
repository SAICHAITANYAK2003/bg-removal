import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  creditBalance: { type: Number, default: 5 },
});

 
if (mongoose.models.userInfo) delete mongoose.models.userInfo;

const userModel = mongoose.model("userInfo", userSchema);
export default userModel;
