import axios from "axios";
import userModel from "../models/userModel.js";
import connectCloudinary from "../config/cloudinary.js";
import FormData from "form-data";

const clipDrop_Api_Link = "https://clipdrop-api.co/remove-background/v1";

export const removeBgImage = async (request, response) => {
  const imageFile = request.file?.buffer;

  if (!imageFile) {
    return response.json({ success: false, message: "No file uploaded" });
  }

  try {
    const clerkId = request.clerkId;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return response.json({ success: false, message: "User Not Found" });
    }

    if (user.creditBalance === 0) {
      return response.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    //ClipDrop process
    const formData = new FormData();
    formData.append("image_file", imageFile, {
      filename: request.file.originalname,
      contentType: request.file.mimetype,
    });

    const { data } = await axios.post(clipDrop_Api_Link, formData, {
      headers: {
        ...formData.getHeaders(),
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    });

    //Cloudinary Process

    const dataUri = `data:${request.file.mimetype};base64,${Buffer.from(
      data
    ).toString("base64")}`;

    const cloudinaryResult = await connectCloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
      folder: "bgRemoval",
    });

    const newBalance = user.creditBalance - 1;
    await userModel.findByIdAndUpdate(user._id, { creditBalance: newBalance });

    return response.json({
      success: true,
      imageUrl: cloudinaryResult.secure_url,
      creditBalance: newBalance,
    });
  } catch (error) {
    console.log(error.response?.data.toString() || error.message);
    return response.json({ success: false, message: error.message });
  }
};
