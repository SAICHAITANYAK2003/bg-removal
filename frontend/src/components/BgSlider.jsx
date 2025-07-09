import React, { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const onHandleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <>
      <div className="mt-28  md:py-20 mx-2 ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center max-sm:leading-10 md:leading-14 text-gray-600">
          Remove Background With <br />
          High Quality and Accuracy
          <br />
        </h2>
        <div className="relative w-full max-w-3xl overflow-hidden m-auto mt-10">
          {/* with-bg-image */}
          <img
            src={assets.image_w_bg}
            style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
            alt="image_w_bg"
            className="rounded-2xl"
          />
          {/* with-out-bg-image */}
          <img
            src={assets.image_wo_bg}
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            alt="image_wo_bg"
            className="rounded-2xl absolute top-0 left-0 w-full h-full "
          />

          <input
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={onHandleSliderChange}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   z-10 slider"
          />
        </div>
      </div>
    </>
  );
};

export default BgSlider;
