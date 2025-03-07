import React from "react";
import beautyImage from "../../images/beauty_trand_1.jpg";

const BeautyTrands = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row my-5">
        {/* Image Column */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={beautyImage}
            alt="Beauty Trands"
            className="my-3 mx-auto block w-4/5"
          />
        </div>
        {/* Text Column */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h3 className="text-center lg:text-left font-semibold mt-3 text-[calc(1.3rem+0.6vw)]">
            BEAUTY TRANDS
          </h3>
          <p className="text-center lg:text-left">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeautyTrands;
