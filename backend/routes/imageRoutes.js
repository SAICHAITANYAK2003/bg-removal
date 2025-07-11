import express from "express";
import { removeBgImage } from "../controllers/imageController.js";
import { upload } from "../config/multer.js";
import { userAuth } from "../middlewares/userAuth.js";

const imageRouter = express.Router();

imageRouter.post("/remove-bg", upload.single("image"), userAuth, removeBgImage);

export default imageRouter;
