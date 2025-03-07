import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom"; // Import Link
import { FaHeart } from 'react-icons/fa';
import Footer from '../home/Footer.jsx';
import SmallHeader from '../home/SmallHeader';
import banner from '../../images/33.png';

const API_BASE_URL = "http://localhost:5000";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const Cosmetics = () => {
  const [cosmetics, setCosmetics] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/category/cosmetics`)
      .then((response) => response.json())
      .then((data) => setCosmetics(data))
      .catch((error) => console.error('Error fetching cosmetics:', error));
  }, []);

  return (
    <div>
      <div className="w-full">
        <SmallHeader pageTitle="Cosmetics" />
      </div>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="relative mb-12">
            <img
              src={banner}
              alt="Cosmetics Banner"
              className="w-full h-80 object-cover object-top rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-700 opacity-75 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-5xl font-bold drop-shadow-lg">Cosmetics</h1>
            </div>
          </div>

          {/* Cosmetics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cosmetics.map((item) => (
              <Link key={item._id} to={`/product/${item._id}`} className="no-underline">
                <div className="bg-white rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-75 object-cover"
                  />
                  <div className="p-2">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-700 text-sm font-semibold">${item.price}</p>
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <FaHeart className="mr-1" />
                      <span className="font-medium">Popular</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cosmetics;
