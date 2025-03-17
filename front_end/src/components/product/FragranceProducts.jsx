import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart, starOutline, star, bagAddOutline, filterOutline } from "ionicons/icons";
import Footer from "../home/Footer";
import SmallHeader from '../home/SmallHeader';

const API_BASE_URL = "http://localhost:5000";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const FragranceProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fragranceCategories = [
    { id: "all", name: "All Fragrances" },
    { id: "floral", name: "Floral" },
    { id: "woody", name: "Woody" },
    { id: "oriental", name: "Oriental" },
    { id: "fresh", name: "Fresh" },
    { id: "citrus", name: "Citrus" }
  ];

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/Fragrence`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Map the data to the expected format
        const formattedProducts = data.map(product => ({
          id: product._id.$oid, // Use the ID from the response
          name: product.name,
          price: product.price,
          rating: product.rating,
          category: product.category,
          image: getImageUrl(product.image), // Use the getImageUrl function
          description: product.details, // Use the details field for description
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
      <SmallHeader pageTitle="Fragrance" />
      
      {/* Hero section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[#ffffff] to-[#fff5f6] py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">Luxury Fragrances</h1>
            <p className="text-gray-600 mb-6 md:w-2/3 lg:w-1/2 text-lg">
              Discover our collection of premium scents crafted to evoke emotions and create lasting impressions.
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
            <h2 className="text-2xl font-bold text-gray-800">Fragrance Collection</h2>
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
                {fragranceCategories.map(category => (
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
                  max="200"
                  step="10"
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
                <h3 className="text-xl text-gray-700 mb-4">No fragrances match your current filters</h3>
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 200]);
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
          </>
        )}
      </div>
      
  
      
      {/* Fragrance guide section */}
      <div className="bg-[#fff5f6] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Fragrance Guide</h2>
          <p className="text-center text-gray-600 mb-8">Understanding fragrance families and how to choose your perfect scent</p>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">How to Choose a Fragrance</h3>
                <p className="text-gray-600 mb-4">Finding your signature scent is a personal journey. Consider these factors:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#fa929d] mr-2">•</span>
                    <span>Your personal preferences and the occasions you'll wear it</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#fa929d] mr-2">•</span>
                    <span>The fragrance family that resonates with you</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#fa929d] mr-2">•</span>
                    <span>How the scent evolves on your skin over time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#fa929d] mr-2">•</span>
                    <span>The season and climate where you'll wear it</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Fragrance Families</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Floral</h4>
                    <p className="text-gray-600 text-sm">Rose, jasmine, lily - romantic and feminine</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Woody</h4>
                    <p className="text-gray-600 text-sm">Sandalwood, cedar, pine - warm and earthy</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Oriental</h4>
                    <p className="text-gray-600 text-sm">Vanilla, spices, amber - rich and exotic</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Fresh</h4>
                    <p className="text-gray-600 text-sm">Ocean, green notes - clean and invigorating</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Citrus</h4>
                    <p className="text-gray-600 text-sm">Lemon, bergamot, orange - bright and uplifting</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-[#fa929d] hover:text-[#e87e89] font-medium hover:underline">
                Read our complete fragrance guide
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-3">
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
              </div>
              <p className="text-gray-600 italic mb-4">"The Amber & Sandalwood fragrance is absolutely divine! I receive compliments every time I wear it. Long-lasting and sophisticated."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">Sarah L.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-3">
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
              </div>
              <p className="text-gray-600 italic mb-4">"I've been using Ocean Breeze for months now and it's become my signature scent. Fresh but not overpowering, perfect for daily wear."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">Michael T.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-3">
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={star} />
                <IonIcon icon={starOutline} />
              </div>
              <p className="text-gray-600 italic mb-4">"The gift set was perfect for my wife's birthday. Beautifully packaged and the fragrances are high quality. Will definitely shop here again."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">David R.</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-[#fff5f6] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Join Our Fragrance Club</h2>
          <p className="text-gray-600 mb-6">Sign up for exclusive offers, new releases, and personalized fragrance recommendations.</p>
          
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FragranceProducts;