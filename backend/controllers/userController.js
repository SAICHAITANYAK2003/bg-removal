import { Webhook } from "svix";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
import dotenv from "dotenv";
dotenv.config();

//API Controller Function to manage Clerk user with database
//http://localhost:4000/api/user/webhooks

export const clerkWebHooks = async (request, response) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = whook.verify(request.body, {
      "svix-id": request.headers["svix-id"],
      "svix-timestamp": request.headers["svix-timestamp"],
      "svix-signature": request.headers["svix-signature"],
    });

    const { data, type } = evt;

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
        response.json({});
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
          await userModel.findOneAndUpdate({ clerkId: data.id }, userData);

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

//API Controller Function to get user available credits data

export const userCredits = async (request, response) => {
  try {
    const clerkId = request.clerkId;

    const userData = await userModel.findOne({ clerkId });

    if (!userData) {
      return response.json({ success: false, message: "User not found" });
    }
    response.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log(error.message);
    response.json({ success: false, message: error.message });
  }
};

//Gateway Initialize

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API TO MAKE PAYMENT FOR CREDITS

export const paymentRazorpay = async (request, response) => {
  try {
    const clerkId = request.clerkId;
    const { planId } = request.body;

    const user = await userModel.findOne({ clerkId });

    if (!user || !planId) {
      return response.json({
        success: false,
        message: "Invalid User and Credentials",
      });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        break;
    }

    date = Date.now();

    //Create Transaction :

    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return response.json({ success: false, message: error });
      }
      return response.json({ success: true, order });
    });
  } catch (error) {
    console.log(error.message);
    return response.json({ success: false, message: error.message });
  }
};

//To verify RazorPay
export const verifyRazorpay = async (request, response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      request.body;

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return response.json({
        success: false,
        message: "Payment verification failed (Invalid Signature)",
      });
    }

    // Fetch order details
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    const transactionData = await transactionModel.findById(orderInfo.receipt);
    if (!transactionData) {
      return response.json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transactionData.payment) {
      return response.json({
        success: false,
        message: "Payment already processed",
      });
    }

    // Add credits
    const userData = await userModel.findOne({
      clerkId: transactionData.clerkId,
    });

    const creditBalance = userData.creditBalance + transactionData.credits;

    await userModel.findByIdAndUpdate(userData._id, { creditBalance });

    // Mark transaction as paid
    await transactionModel.findByIdAndUpdate(transactionData._id, {
      payment: true,
    });

    return response.json({ success: true, message: "Credits Added" });
  } catch (error) {
    console.log(error.message);
    return response.json({ success: false, message: error.message });
  }
};
