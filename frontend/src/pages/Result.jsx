import React from "react";
import { assets } from "../assets/assets";
const Result = () => {
  return (
    <>
      <div className="min-h-[70vh] mx-4 my-3 lg:mx-44 flex items-center justify-center">
        <div className="w-fit bg-white rounded-md shadow-lg ">
          <div className=" flex flex-col md:grid grid-cols-2 gap-4 p-10 rounded-md">
            {/* Original Image */}
            <div className="flex flex-col">
              <h1 className="mb-2">Original</h1>
              <img
                src={assets.image_w_bg}
                alt="image_w_bg"
                className="rounded-md"
              />
            </div>

            {/* With-Out Background Image */}
            <div className="flex flex-col">
              <h1 className="mb-2">Background Removed</h1>

              <div className="border-2 border-gray-300 relative h-full  overflow-hidden rounded-md bg-layer">
                <img src={assets.image_wo_bg} alt="image_w_bg" className="" />
                {/* <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
                  <div className="border-4 h-12 w-12 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex  gap-4 w-full  sm:justify-end max-md:flex-col  px-10 pb-10">
            <button className="border-2 border-violet-600 px-5 py-2 rounded-full cursor-pointer  text-violet-600 hover:scale-105 transition-all duration-500 ">
              Try another image
            </button>
            <a className="bg-linear-to-r from-[#7648FF] to-[#D34AF8] px-5 py-2 text-white rounded-full cursor-pointer hover:scale-105 transition-all duration-500">
              Download image
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
