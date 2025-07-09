import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongooseDB from "./config/mongodb.js";
dotenv.config();

//Config
const app = express();
await mongooseDB();

//Middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

//Routes
app.get("/", (request, response) => {
  response.send("Welcome to BG Removal server");
});

app.listen(port, () => {
  console.log(`🚀 Server is running at port :${port}`);
});
