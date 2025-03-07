import React from "react";
import SeprayImage from "../../images/image_sepray.webp";
import NailPolishImage from "../../images/image_nailpolish.webp";
import LipstickImage from "../../images/image_lipstick.webp";
import PerfumeImage from "../../images/image_perfume.webp";

const TopCollections = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-center text-3xl [font-family:'Italianno',cursive] text-[#fa929d]">Top Collections</h2>
        <h2 className="text-center text-4xl font-semibold mb-3" >BEST OFFERS</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Product Card */}
        <div className="bg-gray-100">
          <img
            src={SeprayImage}
            alt="Product 1"
            className="w-full"
          />
          <div className="p-2 text-center text-lg text-yellow-500">
            <div className="flex justify-center space-x-1">
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star text-gray-800"></i>
            </div>
            <div className="text-gray-800">
              <p className="mb-0">Oil-in-Serum</p>
            </div>
            <div className="font-bold my-0">
              <span>$450.00</span>
            </div>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-gray-100">
          <img
            src={NailPolishImage}
            alt="Product 2"
            className="w-full"
          />
          <div className="p-2 text-center text-lg text-yellow-500">
            <div className="flex justify-center space-x-1">
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star text-gray-800"></i>
            </div>
            <div className="text-gray-800">
              <p className="mb-0">Oil-in-Serum</p>
            </div>
            <div className="font-bold my-0">
              <span>$450.00</span>
            </div>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-gray-100">
          <img
            src={LipstickImage}
            alt="Product 3"
            className="w-full"
          />
          <div className="p-2 text-center text-lg text-yellow-500">
            <div className="flex justify-center space-x-1">
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star text-gray-800"></i>
            </div>
            <div className="text-gray-800">
              <p className="mb-0">Oil-in-Serum</p>
            </div>
            <div className="font-bold my-0">
              <span>$450.00</span>
            </div>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-gray-100">
          <img
            src={PerfumeImage}
            alt="Product 4"
            className="w-full"
          />
          <div className="p-2 text-center text-lg text-yellow-500">
            <div className="flex justify-center space-x-1">
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star"></i>
              <i className="las la-star text-gray-800"></i>
            </div>
            <div className="text-gray-800">
              <p className="mb-0">Oil-in-Serum</p>
            </div>
            <div className="font-bold my-0">
              <span>$450.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCollections;
