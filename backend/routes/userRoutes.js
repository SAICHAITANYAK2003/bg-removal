import express from "express";
import { clerkWebHooks, userCredits } from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebHooks);
userRouter.get("/credits", userAuth, userCredits);

export default userRouter;
