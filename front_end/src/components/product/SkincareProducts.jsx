import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart, starOutline, star, bagAddOutline } from "ionicons/icons";
// import { CartContext } from "./CartContext";
import Footer from "../home/Footer.jsx";
import SmallHeader from '../home/SmallHeader';
const SkincareProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
//   const { addToCart } = React.useContext(CartContext);
  
  const skinCareCategories = [
    { id: "all", name: "All Products" },
    { id: "cleanser", name: "Cleansers" },
    { id: "toner", name: "Toners" },
    { id: "serum", name: "Serums" },
    { id: "moisturizer", name: "Moisturizers" },
    { id: "mask", name: "Face Masks" },
    { id: "sunscreen", name: "Sunscreens" }
  ];
  
  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      name: "Hydrating Facial Cleanser",
      price: 24.99,
      rating: 4.7,
      category: "cleanser",
      image: "/api/placeholder/300/300",
      description: "Gentle, hydrating cleanser for all skin types",
      isNew: true,
      isBestseller: false
    },
    {
      id: 2,
      name: "Vitamin C Brightening Serum",
      price: 48.95,
      rating: 4.9,
      category: "serum",
      image: "/api/placeholder/300/300",
      description: "Powerful antioxidant serum that brightens and evens skin tone",
      isNew: false,
      isBestseller: true
    },
    {
      id: 3,
      name: "Nourishing Night Cream",
      price: 39.99,
      rating: 4.6,
      category: "moisturizer",
      image: "/api/placeholder/300/300",
      description: "Rich moisturizer that repairs skin while you sleep",
      isNew: false,
      isBestseller: false
    },
    {
      id: 4,
      name: "Exfoliating AHA/BHA Toner",
      price: 28.50,
      rating: 4.8,
      category: "toner",
      image: "/api/placeholder/300/300",
      description: "Chemical exfoliant that removes dead skin cells for a brighter complexion",
      isNew: false,
      isBestseller: true
    },
    {
      id: 5,
      name: "Purifying Clay Mask",
      price: 32.00,
      rating: 4.5,
      category: "mask",
      image: "/api/placeholder/300/300",
      description: "Deep cleansing mask that draws out impurities",
      isNew: true,
      isBestseller: false
    },
    {
      id: 6,
      name: "Hyaluronic Acid Hydrating Serum",
      price: 45.00,
      rating: 4.9,
      category: "serum",
      image: "/api/placeholder/300/300",
      description: "Intense hydration for plump, healthy-looking skin",
      isNew: true,
      isBestseller: true
    },
    {
      id: 7,
      name: "SPF 50 Daily Protection",
      price: 34.99,
      rating: 4.7,
      category: "sunscreen",
      image: "/api/placeholder/300/300",
      description: "Lightweight, broad-spectrum sunscreen for daily use",
      isNew: false,
      isBestseller: false
    },
    {
      id: 8,
      name: "Soothing Rose Water Toner",
      price: 22.95,
      rating: 4.6,
      category: "toner",
      image: "/api/placeholder/300/300",
      description: "Calming, alcohol-free toner that balances skin pH",
      isNew: false,
      isBestseller: false
    }
  ];

  // Simulate loading products from an API
  useEffect(() => {
    setTimeout(() => {
      setProducts(sampleProducts);
      setIsLoading(false);
    }, 800);
  }, []);

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

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
   <SmallHeader pageTitle="SkinCare" />
      
      {/* Hero section */}
      <div className="bg-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Skincare Collection</h1>
          <p className="text-gray-600 mb-6">Discover premium products for a radiant complexion</p>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
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
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
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
            ))}
          </div>
        )}
      </div>
      
      {/* Benefits section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our Skincare?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#fff5f6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#fa929d] text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Clean Ingredients</h3>
              <p className="text-gray-600">Free from harmful chemicals and packed with natural ingredients your skin will love.</p>
            </div>
            
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#fff5f6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#fa929d] text-2xl">♥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cruelty-Free</h3>
              <p className="text-gray-600">All our products are ethically made with no animal testing at any stage.</p>
            </div>
            
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#fff5f6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#fa929d] text-2xl">✿</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable packaging that's good for your skin and better for our planet.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-[#fff5f6] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Join Our Beauty Community</h2>
          <p className="text-gray-600 mb-6">Sign up for our newsletter to receive exclusive offers, skincare tips, and early access to new products.</p>
          
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa929d] md:w-64 lg:w-80"
            />
            <button className="px-6 py-3 bg-[#fa929d] text-white rounded-lg hover:bg-[#e87e89] transition-colors duration-300 font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Simple version */}
      <Footer />
    </div>
  );
};

export default SkincareProducts;