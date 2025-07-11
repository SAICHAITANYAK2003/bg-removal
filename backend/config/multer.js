import multer from "multer";

//creating multer middleware for passing form data

const storage = multer.memoryStorage();

export const upload = multer({ storage });
