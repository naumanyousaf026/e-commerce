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

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
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
    <div className="max-w-2xl mx-auto bg-white p-10 shadow-xl rounded-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add New Product</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" name="title" placeholder="Product Title" value={product.title} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <textarea name="details" placeholder="Product Details" value={product.details} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" name="discount" placeholder="Discount (optional)" value={product.discount} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="number" name="rating" placeholder="Rating (1-5)" value={product.rating} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" name="offers" placeholder="Offers (optional)" value={product.offers} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <select name="category" value={product.category} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="product">Product</option>
          <option value="beautyWorld">Beauty World</option>
          <option value="offerCollection">Offer Collection</option>
          <option value="cosmetics">Cosmetics</option>
          <option value="bestProduct">Best Product</option>
          <option value="megaCollection">Mega Collection</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300" disabled={loading}>
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
