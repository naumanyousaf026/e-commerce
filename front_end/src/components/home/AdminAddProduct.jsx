import { useState } from "react";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    name: "",
    details: "",
    price: "",
    discount: "",
    rating: "",
    offers: "",
    image: null,
    category: "product",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    
    // Create image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("name", product.name);
    formData.append("details", product.details);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("rating", product.rating);
    formData.append("offers", product.offers);
    formData.append("image", product.image);
    formData.append("category", product.category);

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({ title: "", name: "", details: "", price: "", discount: "", rating: "", offers: "", image: null, category: "product" });
        setPreview(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add product");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-white to-blue-50 p-8 shadow-2xl rounded-xl mt-10 border border-blue-100">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-600 h-12 w-1 rounded-full mr-3"></div>
        <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter product title" 
              value={product.title} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter product name" 
              value={product.name} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Details</label>
            <textarea 
              name="details" 
              placeholder="Enter product details" 
              value={product.details} 
              onChange={handleChange} 
              required 
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input 
                type="number" 
                name="price" 
                placeholder="0.00" 
                value={product.price} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input 
                type="text" 
                name="discount" 
                placeholder="Optional" 
                value={product.discount} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <input 
                type="number" 
                name="rating" 
                placeholder="1-5" 
                min="1" 
                max="5" 
                value={product.rating} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Offers</label>
              <input 
                type="text" 
                name="offers" 
                placeholder="Optional" 
                value={product.offers} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              name="category" 
              value={product.category} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
            >
              <option value="product">Product</option>
              <option value="beautyWorld">Beauty World</option>
              <option value="offerCollection">Offer Collection</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="bestProduct">Best Product</option>
              <option value="megaCollection">Mega Collection</option>
              <option value="Skincare">Product of Skincare</option>
              <option value="Haircare">Product of Haircare</option>
              <option value="Fragrence">Product of Fragrence</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-blue-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  required 
                  className="hidden" 
                />
              </label>
            </div>
            {preview && (
              <div className="mt-3">
                <div className="relative h-40 w-full overflow-hidden rounded-lg border border-gray-300">
                  <img src={preview} alt="Preview" className="h-full w-full object-contain" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button 
          type="button" 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg text-lg font-bold hover:from-blue-700 hover:to-blue-600 transition duration-300 shadow-lg flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading Product...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
              </svg>
              Upload Product
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminAddProduct;