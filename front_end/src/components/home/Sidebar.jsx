import React, { useState } from "react";
import { FaHome, FaList, FaDollarSign, FaStore } from "react-icons/fa";

const Sidebar = () => {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  return (
    <div className="bg-[#5B7C99] from-indigo-600 to-purple-600 shadow-xl rounded-xl p-6 w-72 text-white">
      <ul id="menu" className="space-y-6">
        {/* Home Link */}
        <li>
          <a
            href="#"
            className="flex items-center space-x-3 hover:text-yellow-300 transition duration-300"
          >
            <FaHome className="text-2xl" />
            <span className="text-lg font-medium">Home</span>
          </a>
        </li>

        {/* Category Section */}
        <li>
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center justify-between w-full hover:text-yellow-300 transition duration-300"
          >
            <div className="flex items-center space-x-3">
              <FaList className="text-2xl" />
              <span className="text-lg font-semibold">CATEGORY</span>
            </div>
            <span
              className={`transform transition duration-300 ${
                categoryOpen ? "rotate-90" : ""
              }`}
            >
              &#9654;
            </span>
          </button>
          {categoryOpen && (
            <ul className="mt-3 ml-8 space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Best Product
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Cosmetics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Beauty World
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Offer Collection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Mega Collection
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Price Section */}
        <li>
          <button
            onClick={() => setPriceOpen(!priceOpen)}
            className="flex items-center justify-between w-full hover:text-yellow-300 transition duration-300"
          >
            <div className="flex items-center space-x-3">
              <FaDollarSign className="text-2xl" />
              <span className="text-lg font-semibold">PRICE</span>
            </div>
            <span
              className={`transform transition duration-300 ${
                priceOpen ? "rotate-90" : ""
              }`}
            >
              &#9654;
            </span>
          </button>
          {priceOpen && (
            <ul className="mt-3 ml-8 space-y-3 text-sm">
              <li className="flex items-center">
                <input type="checkbox" id="below-50" className="mr-2" />
                <label htmlFor="below-50">below-50</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="$51-$100" className="mr-2" />
                <label htmlFor="$51-$100">$51-$100</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="$101-$200" className="mr-2" />
                <label htmlFor="$101-$200">$101-$200</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="$201-$300" className="mr-2" />
                <label htmlFor="$201-$300">$201-$300</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="$301-$400" className="mr-2" />
                <label htmlFor="$301-$400">$301-$400</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="ABOVE-$400" className="mr-2" />
                <label htmlFor="ABOVE-$400">ABOVE-$400</label>
              </li>
            </ul>
          )}
        </li>

        {/* Brand Section */}
        <li>
          <button
            onClick={() => setBrandOpen(!brandOpen)}
            className="flex items-center justify-between w-full hover:text-yellow-300 transition duration-300"
          >
            <div className="flex items-center space-x-3">
              <FaStore className="text-2xl" />
              <span className="text-lg font-semibold">BRAND</span>
            </div>
            <span
              className={`transform transition duration-300 ${
                brandOpen ? "rotate-90" : ""
              }`}
            >
              &#9654;
            </span>
          </button>
          {brandOpen && (
            <ul className="mt-3 ml-8 space-y-3 text-sm">
              <li className="flex items-center">
                <input type="checkbox" id="SIMULE" className="mr-2" />
                <label htmlFor="SIMULE">SIMULE</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="MISUL" className="mr-2" />
                <label htmlFor="MISUL">MISUL</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="LIFESTYLE" className="mr-2" />
                <label htmlFor="LIFESTYLE">LIFESTYLE</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="NILL" className="mr-2" />
                <label htmlFor="NILL">NILL</label>
              </li>
              <li className="flex items-center">
                <input type="checkbox" id="ZARA" className="mr-2" />
                <label htmlFor="ZARA">ZARA</label>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
