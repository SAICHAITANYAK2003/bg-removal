import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

const BuyCredit = () => {
  const { backendUrl, loadCredits } = useContext(AppContext);
  const navigate = useNavigate();

  const { getToken } = useAuth();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        const token = getToken();

        try {
          const { data } =await axios.post(
            backendUrl + "/api/user/verify-payment",
            response,
            { headers: { token } }
          );

          if (data.success) {
            loadCredits();
            navigate("/");
            toast.success("Credits Added");
          }
        } catch (error) {
          console.log(error.message);

          toast.error(error.message);
        }
      },
    };

    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/razor-pay",
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="min-h-[75vh] text-center pt-4 ">
        <button className="border border-gray-400 px-10 py-3 rounded-full cursor-pointer ">
          OUR PLANS
        </button>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center max-sm:leading-10 md:leading-14 text-gray-600 mt-5">
          Choose the plan that’s right for you
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {plans.map((plan, index) => (
            <div
              className="bg-white px-10 py-15 text-left rounded-2xl border border-gray-300 drop-shadow-sm hover:scale-105 transition-all duration-700 "
              key={index}
            >
              <img
                src={assets.bg_logo_icon}
                alt="logo-icon"
                className="w-15 rounded-full"
              />
              <p className="font-semibold text-neutral-700 mt-4">{plan.id}</p>
              <p className="mt-4 text-neutral-600">{plan.desc}</p>

              <div className="mt-7">
                <p className="text-sm">
                  <span className="text-2xl font-semibold mr-3">
                    ${plan.price}
                  </span>
                  / {plan.credits} credits
                </p>
              </div>

              <button
                onClick={() => paymentRazorpay(plan.id)}
                className="px-4 py-2 bg-black text-white rounded-md mt-5 cursor-pointer w-full"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyCredit;
