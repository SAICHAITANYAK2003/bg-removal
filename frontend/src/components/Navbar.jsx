import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credits, fetchCredits, loadingCredits } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      fetchCredits();
    }
  }, [isSignedIn]);
  return (
    <>
      <div className="flex items-center justify-between px-2 py-4 md:py-0 md:px-20 md:pt-4 w-full">
        <Link to="/">
          <img
            src={assets.logo_no_bg}
            alt="logo"
            className="w-30 h-5` md:w-40 md:h-25"
          />
        </Link>
        {isSignedIn ? (
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center border-[0.5px] bg-violet-100 border-violet-700  px-2 py-1.5 sm:py-2 rounded-full cursor-pointer "
            >
              <img src={assets.credit_icon} alt="credit-icon" className="w-5" />
              <p className="ml-1.5 max-sm:text-[12px] flex items-center gap-x-1.5">
                Credits Left :
                {loadingCredits ? (
                  <span className="w-5 h-5 border-4 border-dashed rounded-full animate-spin border-violet-500 mx-auto"></span>
                ) : (
                  <span>{credits}</span>
                )}
              </p>
            </button>

            <UserButton />
          </div>
        ) : (
          <button
            onClick={() => openSignIn({})}
            className="group bg-linear-to-r from-[#7648FF] to-[#D34AF8] px-5 py-2 text-white rounded-full cursor-pointer flex items-center  "
          >
            Get Started{" "}
            <FaArrowRightLong className="transition group-hover:translate-x-1 ml-1" />
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
