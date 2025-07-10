import { Webhook } from "svix";
import userModel from "../models/userModel.js";

//API Controller Function to manage Clerk user with database
//http://localhost:4000/api/user/webhooks

export const clerkWebHooks = async (request, response) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(request.body), {
      "svix-id": request.headers["svix-id"],
      "svix-timestamp": request.headers["svix-timestamp"],
      "svix-signature": request.headers["svix-signature"],
    });

    const { data, type } = request.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };
        await userModel.create(userData);
        response.json();
        break;
      }

      case "user.updated":
        {
          const userData = {
            email: data.email_addresses[0].email_address,
            photo: data.image_url,
            firstName: data.first_name,
            lastName: data.last_name,
          };
          await userModel.findByIdAndUpdate({ clerkId: data.id }, userData);
          response.json({});
        }
        break;
      case "user.deleted":
        await userModel.findOneAndDelete({ clerkId: data.id });
        response.json({});
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    response.json({ success: false, message: error.message });
  }
};
