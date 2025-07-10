import jwt from "jsonwebtoken";

export const userAuth = async (request, response, next) => {
  try {
    const { token } = request.headers;

    if (!token) {
      return response.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const tokenDecode = jwt.decode(token);

    request.body.clerkId = tokenDecode.clerkId;

    next();
  } catch (error) {
    console.log(error.message);
    response.json({ success: false, message: error.message });
  }
};
