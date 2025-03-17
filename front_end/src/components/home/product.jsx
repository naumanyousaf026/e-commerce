import React, { useState, useEffect } from "react";
import { FaHome, FaList, FaDollarSign, FaTags, FaFilter, FaSort, FaChevronDown } from "react-icons/fa";
import Footer from "./Footer.jsx";
import { useParams } from "react-router-dom";
import SmallHeader from './SmallHeader.jsx';
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

const FilterDropdown = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
      >
        {icon}
        <span>{title}</span>
        <FaChevronDown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
          {children}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ id, image, title, price, rating, discount }) => {
  const imageUrl = getImageUrl(image);
  
  // Ensure price is a number and handle undefined cases
  const formattedPrice = typeof price === 'string' ? parseFloat(price.replace("$", "")) : price;
  const displayPrice = !isNaN(formattedPrice) ? `$${formattedPrice.toFixed(2)}` : 'N/A';

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
        <div className="relative">
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="font-medium text-gray-800 truncate">{title}</p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-indigo-600">{displayPrice}</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const  Product= () => {
  // State for active filters
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState("All");
  const [activeBrands, setActiveBrands] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products/category/product');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // Toggle brand selection
  const toggleBrand = (brand) => {
    if (activeBrands.includes(brand)) {
      setActiveBrands(activeBrands.filter(b => b !== brand));
    } else {
      setActiveBrands([...activeBrands, brand]);
    }
  };

  // Define categories and price ranges
  const categories = ["All", "Skincare", "Makeup", "Haircare", "Fragrance"];
  const priceRanges = ["All", "Under $20", "$20 - $50", "$50 - $100", "Above $100"];
  const brands = ["SIMULE", "MISUL", "LIFESTYLE", "NILL", "ZARA"];

  // Filter products based on active filters
  const filteredProducts = products.filter(product => {
    // Category filter
    const categoryMatch = activeCategory === "All" || product.category === activeCategory;
    
    // Price filter
    let priceMatch = true;
    if (activePriceRange !== "All") {
      const price = parseFloat(product.price.replace("$", ""));
      if (activePriceRange === "Under $20") priceMatch = price < 20;
      else if (activePriceRange === "$20 - $50") priceMatch = price >= 20 && price <= 50;
      else if (activePriceRange === "$50 - $100") priceMatch = price > 50 && price <= 100;
      else if (activePriceRange === "Above $100") priceMatch = price > 100;
    }
    
    // Brand filter
    const brandMatch = activeBrands.length === 0 || activeBrands.includes(product.brand);
    
    return categoryMatch && priceMatch && brandMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-grow">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="w-full">
      <SmallHeader pageTitle="Products" />
      </div>

          {/* Main Content */}
          <main className="p-3">
            {/* Banner with overlay text */}
            <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://ps-beautyshop.myshopify.com/cdn/shop/files/collection_banner.png" 
                alt="Banner" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex flex-col justify-center p-8">
                <h1 className="text-white text-4xl font-bold mb-2">Product Collection</h1>
                <p className="text-white text-lg max-w-md">Discover our premium selection of beauty products for your daily skincare routine.</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold px-6 py-2 rounded-full mt-4 self-start transition transform hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Enhanced Filters Section */}
            <div className="mb-8">
              {/* Filter heading */}
              <div className="flex items-center mb-4">
                <FaFilter className="text-indigo-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Filters & Categories</h2>
              </div>
              
              {/* Filter cards */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                {/* Upper section with dropdowns */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {/* Category filter */}
                  <FilterDropdown title="CATEGORY" icon={<FaList className="text-indigo-600" />}>
                    <div className="p-2 space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`category-${category}`} 
                            name="category"
                            checked={activeCategory === category}
                            onChange={() => setActiveCategory(category)}
                            className="mr-2"
                          />
                          <label htmlFor={`category-${category}`} className="cursor-pointer text-gray-700 hover:text-indigo-600">
                            {category}
                          </label>
                        </div>
                      ))}
                      
                      <div className="pt-2 border-t">
                        <a href="/beautyWorld" className="block text-indigo-600 hover:underline py-1">Beauty World</a>
                        <a href="/offerCollection" className="block text-indigo-600 hover:underline py-1">Offer Collection</a>
                        <a href="/megaCollection" className="block text-indigo-600 hover:underline py-1">Mega Collection</a>
                      </div>
                    </div>
                  </FilterDropdown>
                  
                  {/* Price filter */}
                  <FilterDropdown title="PRICE" icon={<FaDollarSign className="text-indigo-600" />}>
                    <div className="p-2 space-y-2">
                      {priceRanges.map(range => (
                        <div key={range} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`price-${range}`} 
                            name="price"
                            checked={activePriceRange === range}
                            onChange={() => setActivePriceRange(range)}
                            className="mr-2"
                          />
                          <label htmlFor={`price-${range}`} className="cursor-pointer text-gray-700 hover:text-indigo-600">
                            {range}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterDropdown>
                  
                  {/* Brands filter */}
                  <FilterDropdown title="BRANDS" icon={<FaTags className="text-indigo-600" />}>
                    <div className="p-2 space-y-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`brand-${brand}`} 
                            checked={activeBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="mr-2"
                          />
                          <label htmlFor={`brand-${brand}`} className="cursor-pointer text-gray-700 hover:text-indigo-600">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterDropdown>
                  
                  {/* Sort options */}
                  <FilterDropdown title="SORT BY" icon={<FaSort className="text-indigo-600" />}>
                    <div className="p-2 space-y-2">
                      <button className="w-full text-left px-2 py-1 hover:bg-indigo-50 hover:text-indigo-600 transition rounded">
                        Featured
                      </button>
                      <button className="w-full text-left px-2 py-1 hover:bg-indigo-50 hover:text-indigo-600 transition rounded">
                        Price: Low to High
                      </button>
                      <button className="w-full text-left px-2 py-1 hover:bg-indigo-50 hover:text-indigo-600 transition rounded">
                        Price: High to Low
                      </button>
                      <button className="w-full text-left px-2 py-1 hover:bg-indigo-50 hover:text-indigo-600 transition rounded">
                        Rating
                      </button>
                      <button className="w-full text-left px-2 py-1 hover:bg-indigo-50 hover:text-indigo-600 transition rounded">
                        Newest
                      </button>
                    </div>
                  </FilterDropdown>
                </div>
                
                {/* Active filters display */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  <span className="text-gray-600 font-medium">Active filters:</span>
                  
                  {activeCategory !== "All" && (
                    <button 
                      onClick={() => setActiveCategory("All")} 
                      className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm hover:bg-indigo-200"
                    >
                      Category: {activeCategory} ×
                    </button>
                  )}
                  
                  {activePriceRange !== "All" && (
                    <button 
                      onClick={() => setActivePriceRange("All")} 
                      className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm hover:bg-indigo-200"
                    >
                      Price: {activePriceRange} ×
                    </button>
                  )}
                  
                  {activeBrands.map(brand => (
                    <button 
                      key={brand}
                      onClick={() => toggleBrand(brand)} 
                      className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm hover:bg-indigo-200"
                    >
                      Brand: {brand} ×
                    </button>
                  ))}
                  
                  {(activeCategory !== "All" || activePriceRange !== "All" || activeBrands.length > 0) && (
                    <button 
                      onClick={() => {
                        setActiveCategory("All");
                        setActivePriceRange("All");
                        setActiveBrands([]);
                      }} 
                      className="flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm hover:bg-red-200 ml-auto"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
              
              {/* View controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600">
                  {loading ? (
                    "Loading products..."
                  ) : (
                    `Showing ${filteredProducts.length} of ${products.length} products`
                  )}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    aria-label="Grid view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    aria-label="List view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Loading, Error, or Products Display */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Error loading products</h3>
                <p className="text-gray-500 mb-6">{error}</p>
              </div>
            ) : (
              <div className={`
                ${viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "space-y-4"
                }
              `}>
                {filteredProducts.map((product, index) => (
                  viewMode === "grid" ? (
                    <ProductCard 
                      key={index}
                      id={product._id} // Make sure to pass the correct ID field from your API response
                      image={product.image} 
                      title={product.title} 
                      price={product.price} 
                      rating={product.rating}
                      discount={product.discount}
                    />
                  ) : (
                    <div key={index} className="flex bg-white rounded-lg shadow-md overflow-hidden">
                      <Link to={`/product/${product._id}`} className="flex flex-1">
                        <img 
                          src={getImageUrl(product.image)} 
                          alt={product.title} 
                          className="w-32 h-32 object-cover" 
                        />
                        <div className="p-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-gray-800">{product.title}</h3>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-sm ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                                ))}
                                <span className="text-xs text-gray-500 ml-1">({product.rating}.0)</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-2">Category: {product.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-indigo-600 text-xl">{product.price}</p>
                              {product.discount && (
                                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                                  {product.discount}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setActiveCategory("All");
                    setActivePriceRange("All");
                    setActiveBrands([]);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="flex justify-center mt-10">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Previous</button>
                  <button className="px-4 py-2 border rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">1</button>
                  <button className="px-4 py-2 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">2</button>
                  <button className="px-4 py-2 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">3</button>
                  <button className="px-4 py-2 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Next</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Product;