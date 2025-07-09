import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <>
      <div className="mt-20 lg:mt-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center max-sm:leading-10 md:leading-14 text-gray-600">
          Customer Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 max-sm:px-10">
          {testimonialsData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl max-w-lg space-y-4 hover:scale-105 transition-all duration-500"
            >
              <span className="text-5xl text-neutral-500">”</span>
              <p className="text-sm text-neutral-500">{item.text}</p>
              <div className="flex w-full gap-4">
                <img
                  src={item.image}
                  alt="Testimonials-image"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p>{item.author}</p>
                  <p className="text-sm text-neutral-500">{item.jobTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
