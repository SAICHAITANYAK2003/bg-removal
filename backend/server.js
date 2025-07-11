import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongooseDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
dotenv.config();

//Config
const app = express();
await mongooseDB();
console.log("🌐 ENV DB URI:", process.env.MONGO_URI);

//Middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

//Routes
app.get("/", (request, response) => {
  response.send("Welcome to BG Removal server");
});
app.use("/api/user", userRouter);
app.use("/api/image/", imageRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running at port :${port}`);
});
