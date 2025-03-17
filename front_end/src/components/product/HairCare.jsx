import React, { useState, useEffect } from "react";
import Footer from "../home/Footer";
import SmallHeader from '../home/SmallHeader';

import banner from "../../images/Hair.jpg";
const API_BASE_URL = "http://localhost:5000";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const HairCarePage = () => {
  const [sortBy, setSortBy] = useState("popular");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/Haircare`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Map the data to the expected format
        const formattedProducts = data.map(product => ({
          id: product._id, // Use the ID from the response
          name: product.name,
          price: product.price,
          rating: product.rating,
          image: getImageUrl(product.image), // Use the getImageUrl function
          description: product.details, // Use the details field for description
          tag: null // You can set this based on your logic
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SmallHeader pageTitle="Hair Care" />
      
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="w-full h-64 bg-gray-200">
          <img 
            src={banner}
            alt="Hair care collection" 
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white bg-opacity-80 p-6 rounded">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Premium Hair Care Collection</h1>
            <p className="text-gray-600">Nourish, strengthen and revitalize your hair</p>
            <button className="mt-4 bg-[#fa929d] hover:bg-[#e8818c] text-white font-bold py-2 px-6 rounded">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      
    
      
      {/* Product Listing */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Sort by:</span>
            <select 
              className="border border-gray-300 rounded py-1 px-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.tag && (
                  <div className={`absolute top-2 right-2 py-1 px-3 rounded text-white uppercase text-xs font-bold ${
                    product.tag === "bestseller" ? "bg-blue-500" : 
                    product.tag === "new" ? "bg-green-500" : 
                    "bg-[#fa929d]"
                  }`}>
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-1">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-gray-600 text-sm">({product.rating})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">${product.price}</span>
                  <button className="bg-[#fa929d] hover:bg-[#e8818c] text-white py-1 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="bg-gray-100 py-12 mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Why Choose Our Hair Care Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-[#fa929d] text-3xl">🌿</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Natural Ingredients</h3>
              <p className="text-gray-600">Made with premium natural ingredients that nourish your hair without harsh chemicals.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-[#fa929d] text-3xl">🧪</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Dermatologist Tested</h3>
              <p className="text-gray-600">All products are dermatologically tested and safe for all hair types.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-[#fa929d] text-3xl">🐰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Cruelty-Free</h3>
              <p className="text-gray-600">We never test on animals and are proudly certified cruelty-free.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-gray-100 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Subscribe to our newsletter</h3>
              <p className="text-gray-600">Get the latest updates on new products and exclusive offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow md:w-64 p-2 border border-gray-300 rounded-l focus:outline-none"
              />
              <button className="bg-[#fa929d] hover:bg-[#e8818c] text-white font-bold py-2 px-4 rounded-r">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
   <Footer />
    </div>
  );
};

export default HairCarePage;