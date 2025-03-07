import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

// Define API base URL
const API_BASE_URL = "http://localhost:5000";

// Helper function to construct full image URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http")
    ? imagePath
    : `${API_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};

const ProductCard = ({ id, image, alt, title, price }) => (
  <Link to={`/product/${id}`} className="block"> {/* Wrap with Link */}
    <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
      <img src={getImageUrl(image)} alt={alt} className="w-full rounded-t-lg" />
      <div className="p-4 text-center text-lg text-yellow-500">
        <div className="flex justify-center space-x-1">
          <i className="las la-star"></i>
          <i className="las la-star"></i>
          <i className="las la-star"></i>
          <i className="las la-star"></i>
          <i className="las la-star text-gray-800"></i>
        </div>
        <div className="text-gray-800">
          <p className="mb-0">{title}</p>
        </div>
        <div className="font-bold my-0">
          <span>{price}</span>
        </div>
      </div>
    </div>
  </Link>
);

const ExclusiveProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/products/category/bestProduct`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="container mx-auto my-5 px-4">
        <div className="text-center">
          <h2 className="text-sty text-3xl text-[#fa929d] [font-family:'Italianno',cursive]">
            Exclusive Products
          </h2>
          <h2 className="mb-3 text-4xl font-semibold">SPECIAL PRODUCTS</h2>
        </div>
        <div className="max-w-md mx-auto text-center mt-0 mb-4">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={index}
                id={product._id} // Pass product ID for navigation
                image={product.image}
                alt={product.name}
                title={product.title || "Product Name"}
                price={product.price ? `$${product.price}` : "N/A"}
              />
            ))
          ) : (
            <p className="text-center col-span-4">Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveProducts;
