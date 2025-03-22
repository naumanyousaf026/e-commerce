import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart, starOutline, star, bagAddOutline } from "ionicons/icons";
import { Link, useNavigate } from "react-router-dom";
import SmallHeader from '../home/SmallHeader';
import Footer from '../home/Footer.jsx';

// Define API base URL
const API_BASE_URL = "http://localhost:5000";

// Helper function to construct full image URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const Cosmetics = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (product) => {
    try {
      console.log("Adding to cart:", product);
      navigate(`/product/${product._id || product.id}`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      navigate(`/product/${product._id || product.id}`);
    }
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<IonIcon key={i} icon={star} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<IonIcon key={i} icon={star} className="text-yellow-400" />);
      } else {
        stars.push(<IonIcon key={i} icon={starOutline} className="text-gray-300" />);
      }
    }

    return stars;
  };

  // Fetch cosmetics products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/cosmetics`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Format products to match the expected structure
        const formattedProducts = data.map(product => ({
          id: product._id,
          name: product.name || product.title || "Product Name",
          price: product.price || 0,
          rating: product.rating || 4.5,
          image: getImageUrl(product.image),
          description: product.details || product.description || "Premium cosmetic product",
          isNew: product.isNew || false,
          isBestseller: true // Since these are featured cosmetics
        }));
        
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="w-full">
        <SmallHeader pageTitle="Cosmetics" />
      </div>
      
      {/* Header section */}
      <div className="bg-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sty text-3xl text-[#fa929d] [font-family:'Italianno',cursive] mb-2">
            Cosmetics Collection
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">COSMETIC PRODUCTS</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>
      
      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={product.image || "/api/placeholder/300/300"} 
                      alt={product.name} 
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/300/300";
                      }}
                    />
                    <button 
                      onClick={() => toggleFavorite(product.id)} 
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      <IonIcon 
                        icon={favorites.includes(product.id) ? heart : heartOutline} 
                        className={`text-xl ${favorites.includes(product.id) ? 'text-[#fa929d]' : 'text-gray-500'}`} 
                      />
                    </button>
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">New</span>
                    )}
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-[#fa929d] text-white text-xs font-bold uppercase px-2 py-1 rounded">Bestseller</span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex items-center mb-2">
                      {renderStars(product.rating)}
                      <span className="text-gray-600 text-sm ml-1">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-gray-800">${product.price?.toFixed(2) || "0.00"}</span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-white text-[#fa929d] border border-[#fa929d] hover:bg-[#fa929d] hover:text-white px-3 py-2 rounded-lg flex items-center transition-colors duration-300"
                      >
                        <IonIcon icon={bagAddOutline} className="mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-600 text-lg">No cosmetic products found.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cosmetics;