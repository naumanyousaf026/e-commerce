import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import Footer from "../home/Footer.jsx";
import SmallHeader from '../home/SmallHeader.jsx';
import { FaSmile, FaStar, FaShoppingCart } from "react-icons/fa";
import beautyVdeo from "../../images/video/beauty1.mp4";

const API_BASE_URL = "http://localhost:5000";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const BeautyWorld = () => {
  const [products, setProducts] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/beautyWorld`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div>
      <SmallHeader pageTitle="BeautyWorld" />

      <div className="container mx-auto p-4">
        <div className="relative mb-12">
          <video ref={videoRef} muted playsInline className="w-full h-[480px] object-cover rounded-lg">
            <source src={beautyVdeo} type="video/mp4" />
          </video>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center p-5 rounded-lg mb-10 shadow-lg">
          <h2 className="text-3xl font-bold">🔥 Limited Time Offer - Up to 50% Off! 🔥</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                  <div className="relative">
                    <img 
                      src={getImageUrl(product.image)} 
                      alt={product.name} 
                      className="w-full h-80 object-cover" 
                      onError={(e) => { e.target.src = '/images/default-placeholder.png'; }} 
                    />
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex items-center text-purple-500 mb-2">
                      <FaSmile className="mr-2" />
                      <span>Highly Rated</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      {[...Array(product.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No products available.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BeautyWorld;
