import express from "express";
import {
  clerkWebHooks,
  paymentRazorpay,
  userCredits,
  verifyRazorpay,
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebHooks);
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/razor-pay", userAuth, paymentRazorpay);
userRouter.post("/verify-payment", verifyRazorpay);

export default userRouter;
