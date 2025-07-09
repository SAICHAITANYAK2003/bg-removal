import { assets } from "../assets/assets";
import { MdOutlineFileUpload } from "react-icons/md";

const HeroSection = () => {
  return (
    <>
      <div className="flex max-sm:flex-col-reverse justify-between items-center pt-10 ">
        <div className="w-full pt-10 max-sm:pl-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:leading-10 lg:leading-14  ">
            Remove the <br />
            <span className="bg-gradient-to-r from-[#7648FF] to-[#D34AF8] bg-clip-text text-transparent">
              background
            </span>{" "}
            from
            <br /> images for free.
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-4">
            A background removal app quickly removes unwanted backgrounds from
            photos.
          </p>

          <div className="w-fit">
            <label
              htmlFor="fileUpload"
              className="bg-gradient-to-r from-[#7648FF] to-[#D34AF8] px-3 py-2 md:px-5 md:py-4 max-sm:text-[12px] text-white rounded-full cursor-pointer flex items-center mt-4 hover:scale-105 transition-all duration-700 "
            >
              <input type="file" id="fileUpload" name="fileUpload" hidden />
              <MdOutlineFileUpload size={30} className="mr-1" />
              Upload your image
            </label>
          </div>
        </div>
        <img
          src={assets.header_img}
          alt="hero-image"
          className="w-64 md:w-80 lg:w-[500px]"
        />
      </div>
    </>
  );
};

export default HeroSection;
