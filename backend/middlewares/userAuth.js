import jwt from "jsonwebtoken";

export const userAuth = async (request, response, next) => {
  try {
    const { token } = request.headers;

    if (!token) {
      return response.json({
        success: false,
        message: "Not Authorized. Login again.",
      });
    }

    const decoded = jwt.decode(token);

    if (!decoded || !decoded.sub) {
      return response.json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    request.clerkId = decoded.sub;

    next();
  } catch (error) {
    console.log(error.message);
    response.json({ success: false, message: error.message });
  }
};
