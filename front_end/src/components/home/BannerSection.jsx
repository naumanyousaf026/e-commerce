import React from 'react';
import banerimage from "../../images/slider_banner_4.webp";
import iconImage from "../../images/iconMessage.png";
const BannerSection = () => {
  return (
    <div>
      {/* Banner Section */}
      <div
        className="w-full h-[70vh] bg-center bg-cover bg-fixed"
        style={{ backgroundImage: `url(${banerimage})` }}
      >
        <div className="flex items-center justify-end h-full">
          <div className="w-full md:w-1/2">
            <h2 className="text-7xl text-[#fa929d] mt-5 font-bold ">beauty</h2>
            <h3 className="text-6xl block font-semibold">HOME DECORATION</h3>
            <h3 className="text-4xl">DEAL OF THE DAY</h3>
          </div>
        </div>
      </div>

      {/* Icon Section */}
      <div className="container mx-auto">
        <div className="flex flex-wrap my-4">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/4 flex flex-col items-center">
                <img
                  src={iconImage}
                  alt=""
                  width="100"
                  className="py-3 px-2 border border-black rounded-full"
                />
                <h5 className="ml-3 my-3">massage</h5>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
