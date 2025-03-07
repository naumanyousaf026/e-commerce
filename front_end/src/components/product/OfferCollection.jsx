import React, { useEffect, useState } from 'react';
import { FaTag } from 'react-icons/fa';
import bannerImg from '../../images/44.png';
import Footer from "../home/Footer.jsx";
import SmallHeader from '../home/SmallHeader.jsx';
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
// Define API base URL
const API_BASE_URL = 'http://localhost:5000';

// Helper function to construct full image URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return imagePath.startsWith('http') 
    ? imagePath 
    : `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const OfferCollection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/offerCollection`);
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      <div className="w-full">
        <SmallHeader pageTitle="Offer Collection" />
      </div>
      <div className="container mx-auto p-6 bg-gray-50">
        {/* Hero Banner */}
        <div className="relative mb-12">
          <img src={bannerImg} alt="Offer Collection Banner" className="w-full h-80 object-cover rounded-xl shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50 rounded-xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-5xl font-extrabold">Offer Collection</h1>
          </div>
        </div>

        {/* Loading and Error Handling */}
        {loading && <p className="text-center text-lg font-semibold">Loading offers...</p>}
        {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

        {/* Offers Grid - 4 Columns */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl lg:grid-cols-4 gap-6">
            {offers.map((offer) => {
              const oldPrice = offer.price; // Original price from API
              const newPrice = oldPrice - (oldPrice * (offer.discount / 100)); // Calculate discounted price

              return (
                <Link to={`/product/${offer._id}`} className="block">
                <div key={offer._id} className="bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
                  <img src={getImageUrl(offer.image)} alt={offer.title} className="w-full rounded-xl object-cover" />
                  <div className="p-5">
                    <h2 className="text-xl font-bold mb-2">{offer.title}</h2>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-gray-500 line-through text-lg">${oldPrice.toFixed(2)}</span>
                      <span className="text-green-600 font-extrabold text-xl">${newPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center text-green-600 text-lg">
                      <FaTag className="mr-2" />
                      <span>Special Offer</span>
                    </div>
                  </div>
                </div>
              </Link>
              
                
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OfferCollection;
