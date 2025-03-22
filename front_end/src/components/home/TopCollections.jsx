import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart, starOutline, star, bagAddOutline } from "ionicons/icons";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000";

const TopCollections = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Helper function to construct full image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("http")
      ? imagePath
      : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/bestProduct`);
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
          description: product.details || product.description || "Premium exclusive product",
          isNew: product.isNew || false,
          isBestseller: true // Since these are "best products"
        }));
        
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to sample data if needed
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    navigate(`/product/${product.id}`);
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

  return (
    <div className="bg-gray-50 py-8">
      {/* Header Section */}
      <div className="bg-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl [font-family:'Italianno',cursive] text-[#fa929d] mb-2">
            Top Collections
          </h2>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            BEST OFFERS
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-3xl mx-auto">
            Discover our most popular products with exclusive deals and premium quality
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={product.image} 
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
                      <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
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
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCollections;