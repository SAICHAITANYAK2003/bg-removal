import React from "react";
import { assets } from "../assets/assets";

const Steps = () => {
  return (
    <div className="mt-28 lg:mt-40">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center max-sm:leading-10 md:leading-14 text-gray-600">
        Steps to remove background <br />
        image in seconds
        <br />
      </h2>

      <div className="mt-4 md:mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:px-8">
        <div className="flex items-start space-x-4 bg-white px-4 py-6 shadow rounded-md hover:scale-105 transition-all duration-500 ">
          <img src={assets.upload_icon} alt="" />
          <div>
            <p className="text-xl font-medium">Upload image</p>
            <p className="text-sm text-neutral-500 mt-2">
              This is a demo text, will replace it later.
              <br /> This is a demo..
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 bg-white px-4 py-6 shadow rounded-md hover:scale-105 transition-all duration-500">
          <img src={assets.remove_bg_icon} alt="" />
          <div>
            <p className="text-xl font-medium">Remove background</p>
            <p className="text-sm text-neutral-500 mt-2">
              This is a demo text, will replace it later.
              <br /> This is a demo..
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4 bg-white px-4 py-6 shadow rounded-md hover:scale-105 transition-all duration-500">
          <img src={assets.download_icon} alt="" />
          <div>
            <p className="text-xl font-medium">Download image</p>
            <p className="text-sm text-neutral-500 mt-2">
              This is a demo text, will replace it later.
              <br /> This is a demo..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
