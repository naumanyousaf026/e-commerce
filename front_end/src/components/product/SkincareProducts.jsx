import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart, starOutline, star, bagAddOutline, filterOutline } from "ionicons/icons";
import Footer from "../home/Footer";
import SmallHeader from '../home/SmallHeader';
import { Link, useNavigate } from "react-router-dom"; 
const API_BASE_URL = "http://localhost:5000";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const SkincareProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const skinCareCategories = [
    { id: "all", name: "All Products" },
    { id: "cleanser", name: "Cleansers" },
    { id: "toner", name: "Toners" },
    { id: "serum", name: "Serums" },
    { id: "moisturizer", name: "Moisturizers" },
    { id: "mask", name: "Face Masks" },
    { id: "sunscreen", name: "Sunscreens" }
  ];

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/Skincare`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Map the data to the expected format
        const formattedProducts = data.map(product => ({
          id: product._id, // Use the ID from the response
          _id: product._id, // Add this to maintain compatibility with both components
          name: product.name,
          title: product.name, // Add this for compatibility with ProductDetails
          price: product.price,
          rating: product.rating || 4.5,
          category: product.subcategory?.toLowerCase() || "other",
          image: product.image, // Keep the original path for consistency
          description: product.details, // Use the details field for description
          details: product.details, // Add this for compatibility with ProductDetails
          size: "50ml", // You can adjust this as needed
          isNew: false, // Set this based on your logic
          isBestseller: false // Set this based on your logic
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

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Modified to navigate to product details after adding to cart
  const handleAddToCart = async (product) => {
    try {
      const discountedPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

      const cartItem = {
        ...product,
        quantity: 1,
        discountedPrice
      };

      // Add to cart API call (if needed)
      const response = await fetch(`${API_BASE_URL}/api/cart/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ 
          productId: product._id || product.id, 
          quantity: 1, 
          discountedPrice 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      // After adding to cart, navigate to product details page
      navigate(`/product/${product._id || product.id}`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Still navigate even if there's an error with the cart
      navigate(`/product/${product._id || product.id}`);
    }
  };

  const filteredProducts = products
    .filter(product => selectedCategory === "all" || product.category === selectedCategory)
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

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
    <div className="bg-gray-50 min-h-screen">
      <SmallHeader pageTitle="Skincare" />
      
      {/* Hero section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[#ffffff] to-[#fff5f6] py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">Luxury Skincare</h1>
            <p className="text-gray-600 mb-6 md:w-2/3 lg:w-1/2 text-lg">
              Discover our collection of premium skincare products crafted to nourish and revitalize your skin.
            </p>
            <button className="bg-[#fa929d] hover:bg-[#e87e89] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300">
              Shop Bestsellers
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('/api/placeholder/400/600')] bg-cover bg-center hidden lg:block"></div>
      </div>
      
      {/* Filtering section */}
      <div className="bg-white py-8 px-4 md:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Skincare Collection</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 hover:text-[#fa929d] transition-colors duration-300 md:hidden"
            >
              <IonIcon icon={filterOutline} className="mr-1" />
              Filters
            </button>
          </div>
          
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {skinCareCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-[#fa929d] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Price range slider */}
              <div className="w-full md:w-64">
                <p className="text-sm text-gray-600 mb-1">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#fa929d]"
                />
              </div>
            </div>
          </div>
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
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-700 mb-4">No skincare products match your current filters</h3>
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 10000]);
                  }}
                  className="text-[#fa929d] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={getImageUrl(product.image)} 
                        alt={product.name} 
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/300/300";
                        }}
                      />
                      <button 
                        onClick={() => toggleFavorite(product.id)} 
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300 z-10"
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
                      
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="bg-white text-[#fa929d] hover:bg-[#fa929d] hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <span className="text-sm text-gray-500">{product.size}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center mb-3">
                        {renderStars(product.rating)}
                        <span className="text-gray-600 text-sm ml-1">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-between">
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
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SkincareProducts;