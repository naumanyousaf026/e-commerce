import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart, starOutline, star, bagAddOutline } from "ionicons/icons";
import Footer from "../home/Footer";
import SmallHeader from '../home/SmallHeader';
import { CartContext } from "./CartContext";

const API_BASE_URL = "http://localhost:5000";

// Helper function to construct full image URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/details/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const getProductImages = () => {
    if (!product) return [];
    return [product.image];
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    try {
      const discountedPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

      const cartItem = {
        ...product,
        quantity,
        discountedPrice
      };

      const response = await fetch(`${API_BASE_URL}/api/cart/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ 
          productId: product._id || product.id, 
          quantity, 
          discountedPrice 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      // Update local cart context
      addToCart(cartItem);

      setShowAddNotification(true);
      setTimeout(() => setShowAddNotification(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    const numRating = Number(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;

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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <SmallHeader pageTitle="Product Details" />
        <div className="flex justify-center items-center min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
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
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <SmallHeader pageTitle="Product Not Found" />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Product Not Found</h2>
            <p className="text-gray-600">Sorry, we couldn't find the product you're looking for.</p>
            <button 
              onClick={() => navigate(-1)}
              className="mt-4 bg-[#fa929d] hover:bg-[#e87e89] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const images = getProductImages();
  const category = product.category || "Product";

  return (
    <div className="bg-gray-50 min-h-screen">
      <SmallHeader pageTitle={product.title || "Product Details"} />
      
      {showAddNotification && (
        <div className="fixed top-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          Product added to cart!
        </div>
      )}
      
      {/* Hero section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[#ffffff] to-[#fff5f6] py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">{product.title || product.name}</h1>
            <p className="text-gray-600 mb-6 md:w-2/3 lg:w-1/2 text-lg">
              {product.details || product.description || "Experience premium quality and exceptional design with our exclusive product."}
            </p>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Images Section */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 rounded-xl overflow-hidden mb-4">
                <img
                  src={getImageUrl(images[activeImage])}
                  alt={product.title || product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/400/400";
                  }}
                />
                <button 
                  onClick={toggleFavorite} 
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
                >
                  <IonIcon 
                    icon={isFavorite ? heart : heartOutline} 
                    className={`text-xl ${isFavorite ? 'text-[#fa929d]' : 'text-gray-500'}`} 
                  />
                </button>
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-[#fa929d] text-white text-xs font-bold uppercase px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="absolute top-3 left-3 bg-[#fa929d] text-white text-xs font-bold uppercase px-2 py-1 rounded">
                    Bestseller
                  </span>
                )}
              </div>
              
              {/* Thumbnail Gallery - only show if we have multiple images */}
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${
                        activeImage === index ? "border-[#fa929d]" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={getImageUrl(img)}
                        alt={`${product.title || product.name} view ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/100/100";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info Section */}
            <div className="md:w-1/2 p-6">
              <div className="flex flex-wrap items-center mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {category}
                </span>
                <div className="ml-auto flex items-center">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="text-gray-600 text-sm ml-1">({product.rating || "0"})</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                {product.discount ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ${typeof discountedPrice === 'number' ? discountedPrice.toFixed(2) : "0.00"}
                    </span>
                    <span className="ml-3 text-lg text-gray-400 line-through">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : "0.00"}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : "0.00"}
                  </span>
                )}
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 my-6">
                <p className="text-gray-700 leading-relaxed">{product.details || product.description || "No description available."}</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                <div className="flex border border-gray-300 rounded-lg w-32">
                  <button
                    className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-l-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center border-none focus:outline-none"
                  />
                  <button
                    className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-r-lg"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-[#fa929d] border border-[#fa929d] hover:bg-[#fa929d] hover:text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <IonIcon icon={bagAddOutline} className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="flex-1 bg-[#fa929d] hover:bg-[#e87e89] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  View Cart
                </button>
              </div>
              
              {/* Additional product meta info */}
              <div className="mt-8 text-sm text-gray-500">
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>In Stock</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;