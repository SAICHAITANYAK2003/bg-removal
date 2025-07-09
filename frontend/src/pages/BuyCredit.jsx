import { assets, plans } from "../assets/assets";

const BuyCredit = () => {
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

              <button className="px-4 py-2 bg-black text-white rounded-md mt-5 cursor-pointer w-full">
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
