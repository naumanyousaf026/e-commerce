import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { CartContext } from "./CartContext";

const API_BASE_URL = "http://localhost:5000";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [showRemoveNotification, setShowRemoveNotification] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  const getProductImages = () => {
    if (!product) return [];
    return [product.image];
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
        body: JSON.stringify({ productId: product._id, quantity, discountedPrice }),
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

  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${product._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      // Update local cart context
      removeFromCart(product._id);

      setShowRemoveNotification(true);
      setTimeout(() => setShowRemoveNotification(false), 2000);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Rest of the component remains the same as in the original code...
  
  // Remove the prop types as we're no longer passing addToCart and removeFromCart as props

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Product Not Found</h2>
          <p className="text-gray-600">Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const displayPrice = (price) => (price !== undefined ? price.toFixed(2) : "N/A");

  const images = getProductImages();

  return (
    <div className="bg-gray-50 py-12">
      {showAddNotification && (
        <div className="fixed top-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          Product added to cart!
        </div>
      )}
      {showRemoveNotification && (
        <div className="fixed top-6 right-6 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          Product removed from cart!
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Product Images Section */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img
                  src={getImageUrl(images[activeImage])}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${
                      activeImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info Section */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {product.category}
                </span>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">(42 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
              
              <div className="mb-6">
                {product.discount ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900">${displayPrice(discountedPrice)}</span>
                    <span className="ml-3 text-lg text-gray-400 line-through">${displayPrice(product.price)}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${displayPrice(product.price)}</span>
                )}
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 my-6">
                <p className="text-gray-700 leading-relaxed">{product.details}</p>
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
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Add to Cart
                </button>
                <button
                  onClick={handleRemoveFromCart}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow transition duration-300"
                >
                  Remove from Cart
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
    </div>
  );
};

ProductDetails.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ProductDetails;