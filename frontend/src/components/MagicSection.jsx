import React, { useContext } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { AppContext } from "../context/AppContext";
const MagicSection = () => {
  const { removeBg } = useContext(AppContext);
  return (
    <>
      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center max-sm:leading-10 md:leading-14 text-gray-600">
          See the magic. Try now
        </h2>

        <div className="w-full flex items-center justify-center mt-4">
          <label
            htmlFor="fileUpload"
            className="bg-gradient-to-r from-[#7648FF] to-[#D34AF8] px-3 py-2 md:px-5 md:py-4 max-sm:text-[12px] text-white rounded-full cursor-pointer flex items-center mt-4 hover:scale-105 transition-all duration-700 "
          >
            <input
              onChange={(e) => removeBg(e.target.files[0])}
              type="file"
              id="fileUpload"
              accept="image/*"
              hidden
            />
            <MdOutlineFileUpload size={30} className="mr-1" />
            Upload your image
          </label>
        </div>
      </div>
    </>
  );
};

export default MagicSection;
