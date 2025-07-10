import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credits, setCredits, loadCredits } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn) {
      loadCredits();
    }
  }, [isSignedIn]);
  return (
    <>
      <div className="flex items-center justify-between px-2 py-4 md:py-0 md:px-20 md:pt-4 w-full">
        <Link to="/">
          <img src={assets.logo_no_bg} alt="logo" className="w-40 h-25" />
        </Link>
        {isSignedIn ? (
          <div>
            <UserButton />
            <p>{credits}</p>
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
