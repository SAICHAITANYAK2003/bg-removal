import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { resultImage, image } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "background-removed.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <>
      <div className="min-h-[70vh] mx-4 my-3 lg:mx-44 flex items-center justify-center">
        <div className="w-fit bg-white rounded-md shadow-lg ">
          <div className="flex flex-col md:grid grid-cols-2 gap-4 p-10 rounded-md">
            {/* Original Image */}
            <div className="flex flex-col">
              <h1 className="mb-2">Original</h1>
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt="original"
                className="rounded-md"
              />
            </div>

            {/* Background Removed Image */}
            <div className="flex flex-col">
              <h1 className="mb-2">Background Removed</h1>
              <div className="border-2 border-gray-300 relative h-full overflow-hidden rounded-md bg-layer">
                <img src={resultImage || ""} alt="bg_removed" className="" />
                {!resultImage && image && (
                  <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                    <div className="border-4 h-12 w-12 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {resultImage && (
            <div className="flex gap-4 w-full sm:justify-end max-md:flex-col px-10 pb-10">
              <button
                onClick={() => navigate("/")}
                className="border-2 border-violet-600 px-5 py-2 rounded-full cursor-pointer text-violet-600 hover:scale-105 transition-all duration-500"
              >
                Try another image
              </button>
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-[#7648FF] to-[#D34AF8] px-5 py-2 text-white rounded-full cursor-pointer hover:scale-105 transition-all duration-500"
              >
                Download image
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Result;
